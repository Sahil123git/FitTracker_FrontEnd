import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Store configuration
export const store = configureStore({
  reducer: rootReducer,
});
