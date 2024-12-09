import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: string;
};

const initialState: InitialState = {
  value: "",
};

export const slugSlice = createSlice({
  name: "slug",
  initialState,
  reducers: {
    setSlug: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSlug } = slugSlice.actions;
export default slugSlice.reducer; // Corrected export
