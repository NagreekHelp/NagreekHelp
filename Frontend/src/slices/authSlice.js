// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/authService.js";
import { jwtDecode } from "jwt-decode";

// Initial state
const storedUser = localStorage.getItem("user");
const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

const initialState = {
  isLoggedIn: storedIsLoggedIn === "true",
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem("token") || null,
  confirmationRequired: false,
  confirmationEmail: null,
  error: null,
  loading: false,
};

// Async thunk: Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk: Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Sending login request with:", credentials);
      const response = await authApi.login(credentials);
      const token = response.data.token;
      const confirmMessage = response.data.message;

      if (!token) {
        return rejectWithValue("No token received from server");
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        return {
          confirmMessage,
          accessToken: token,
          user: {
            id: decodedToken.id,
            role: decodedToken.role,
            email: credentials.email,
          },
        };
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        return rejectWithValue("Invalid token format");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk: Update password
// export const updatePassword = createAsyncThunk(
//   "auth/changePassword",
//   async (credentials, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token;
//       const response = await authApi.changePassword(credentials, token);
//       return response;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Password change failed"
//       );
//     }
//   }
// );

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log("hi", state.isLoggedIn, state.user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
    resetConfirmation(state) {
      state.confirmationRequired = false;
      state.confirmationEmail = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.confirmationRequired = true;
      state.confirmationEmail = action.payload.email;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.loading = false;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Change password
    // builder.addCase(updatePassword.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(updatePassword.fulfilled, (state) => {
    //   state.loading = false;
    // });
    // builder.addCase(updatePassword.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { logout, clearError, resetConfirmation } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;
export default authSlice.reducer;

