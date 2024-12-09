import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userStateType = {
  id: number;
  username: string;
};

const initialState: userStateType = {
  id: 0,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserid: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUserid, setUsername } = userSlice.actions;
export default userSlice.reducer;
