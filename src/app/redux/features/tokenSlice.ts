import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initState = {
  access: string;
  refresh: string;
};

const initialState: initState = {
  access: "",
  refresh: "",
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
});

export const { setAccess, setRefresh } = tokenSlice.actions;
export default tokenSlice.reducer;
