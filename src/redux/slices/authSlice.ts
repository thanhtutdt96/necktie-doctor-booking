import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "types/Common";

const API_KEY = import.meta.env.VITE_API_KEY;

type InitialStateType = {
  user: AuthUser;
};

const initialState: InitialStateType = {
  user: {
    id: "412226f1-e657-4204-897f-82c4b214c610",
    name: "Tu Pham",
    token: API_KEY
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = { ...action.payload };
    }
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
