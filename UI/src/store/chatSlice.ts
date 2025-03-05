import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ChatState, ChatMessage, AttachmentType } from '../types';
import { API_URL } from '../utils/config';



const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  attachments: [],
  isRecording: false,
};

// ✅ Thunk to Send Message with Streaming
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ content, attachments }: { content: string; attachments?: AttachmentType[] }, { dispatch }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: content }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Streaming not supported");
    }

    let fullResponse = "";
    const newMessageId = Date.now().toString();

    // ✅ Dispatch initial empty message to UI
    dispatch(addMessage({
      id: newMessageId,
      content: "",
      sender: "ai",
      timestamp: new Date().toISOString(),
      attachments: []
    }));

    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;
      dispatch(updateLastMessage({ id: newMessageId, content: chunk }));
    }

    return {
      id: newMessageId,
      content: fullResponse,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      attachments: []
    };
  }
);

// ✅ Redux Slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    updateLastMessage: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const message = state.messages.find(m => m.id === action.payload.id);
      if (message) {
        message.content += action.payload.content;
      }
    },
    clearChat: (state) => {
      state.messages = [];
      state.attachments = [];
    },
    addAttachment: (state, action: PayloadAction<AttachmentType>) => {
      state.attachments.push(action.payload);
    },
    clearAttachments: (state) => {
      state.attachments = [];
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        const lastMessage = state.messages.find(m => m.id === action.payload.id);
        if (lastMessage) {
          lastMessage.content = action.payload.content;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

// ✅ Export actions and reducer
export const { addMessage, updateLastMessage, clearChat, addAttachment, clearAttachments, setRecording } = chatSlice.actions;
export default chatSlice.reducer;
