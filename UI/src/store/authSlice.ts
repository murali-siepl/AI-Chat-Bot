import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/config";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  resetEmailSent: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("token") ? { token: localStorage.getItem("token") } : null,
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  resetEmailSent: false,
};

// ✅ Login Action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Invalid username or password. Please try again");
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      return { user: { email: data.data.email, token: data.data.token } };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// ✅ Register Action
export const register = createAsyncThunk(
  "auth/register",
  async (userData: { firstName: string; lastName: string; email: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Registration failed");
      }

      const data = await response.json();

      return { user: data.user };
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// ✅ Logout Action
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/chat/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Logout failed");
    }

    localStorage.removeItem("token");
    return true;
  } catch (error: any) {
    return rejectWithValue(error.message || "Logout failed");
  }
});

// ✅ Reset Password Action
export const resetPassword = createAsyncThunk("auth/resetPassword", async (email: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Password reset failed");
    }

    return { success: true };
  } catch (error: any) {
    return rejectWithValue(error.message || "Password reset failed");
  }
});

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResetEmailSent: (state) => {
      state.resetEmailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Handle Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ✅ Handle Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ✅ Handle Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ✅ Handle Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetEmailSent = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearResetEmailSent } = authSlice.actions;
export default authSlice.reducer;
