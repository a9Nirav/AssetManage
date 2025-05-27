// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import masterReducer from '../features/masterSlice';

export const store = configureStore({
  reducer: {
    master: masterReducer,
  },
});
