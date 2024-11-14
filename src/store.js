import { configureStore } from '@reduxjs/toolkit';
import { horasApi } from '../src/components/api/horasApi.js';

const store = configureStore({
  reducer: {
    [horasApi.reducerPath]: horasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(horasApi.middleware),
});

export default store;
