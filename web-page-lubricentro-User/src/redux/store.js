// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
  },
});

export default store;
