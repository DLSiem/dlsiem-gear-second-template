import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTyps";

type UserRole = "admin" | "user" | "staff";

export interface UserState {
  user_id: string;
  username: string;
  email: string;
  imageUrl: string;
  role: UserRole;
}

export const fetchUsers = createAppAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/api/users");
  return response.json();
});

export const fetchUserById = createAppAsyncThunk(
  "users/fetchUserById",
  async (userId: number) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

interface UsersState {
  users: UserState[];
  currentUser: UserState | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(...action.payload);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to fetch user!";
      });
  },
});

export default usersSlice.reducer;
