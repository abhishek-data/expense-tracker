import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expenseSlice from "./expense-slice";
import themeSlice from "./theme-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
