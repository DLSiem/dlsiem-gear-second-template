import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import counterSlice from "../features/counter/counterSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    counter: counterSlice,
    user: usersSlice,
  },
});

// Infer the type of store
export type AppStore = typeof store;

// infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Infet the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Export reusable type for handwritten thunk
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
