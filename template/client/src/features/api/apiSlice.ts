import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { UserState } from "../users/usersSlice";
export type { UserState };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserState[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<UserState, number>({
      query: (userId: number) => `users/${userId}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = apiSlice;
