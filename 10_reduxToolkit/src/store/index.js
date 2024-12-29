import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./slices/todo-Slice";

export const store = configureStore({
  reducer: todoReducer,
});
