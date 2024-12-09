import { configureStore } from "@reduxjs/toolkit";
import slugReducer from "./features/slugSlice";
import tokensReducer from "./features/tokenSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    slug: slugReducer,
    token: tokensReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
