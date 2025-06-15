import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from '../slices/LoadingSlice';
import authReducer from '../slices/authSlice'; // <-- Add this

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer, // <-- Add this
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
