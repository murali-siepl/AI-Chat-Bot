import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import uiSlice from './uiSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
    auth: authReducer,
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;