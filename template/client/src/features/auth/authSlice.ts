import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTyps";

import type { UserState } from "../users/usersSlice";
import axios from "axios";

interface AuthForm {
  email: string;
  password: string;
}

export const signIn = createAppAsyncThunk(
  `auth/signin`,
  async (form: AuthForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signin",
        form,
        { withCredentials: true }
      );
      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const signUp = createAppAsyncThunk(
  `auth/signup`,
  async (form: AuthForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        form,
        { withCredentials: true }
      );
      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const signOut = createAppAsyncThunk(`auth/signout`, async () => {
  try {
    await axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message ?? "Failed to sign out");
  }
});

export const verifyToken = createAppAsyncThunk("auth/verifyToken", async () => {
  try {
    const response = await axios.get("http://localhost:5000/auth/verify", {
      withCredentials: true,
    });
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message ?? "Failed to verify token");
  }
});

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserState | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.status = "succeeded";
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.status = "failed";
      })
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.status = "idle";
      });
  },
});

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.currentUser;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
