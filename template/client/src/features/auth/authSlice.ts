import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTyps";

import type { UserState } from "../users/usersSlice";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

export const signIn = createAppAsyncThunk(
  `auth/signin`,
  async (form: LoginForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signin",
        form,
        { withCredentials: true }
      );
      console.log("Respins status", response.status);
      console.log("Response--", response.data.user);
      return response.data.user;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

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
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      console.log("Action", action.payload);
      state.currentUser = action.payload;
    });
  },
});

export default authSlice.reducer;
