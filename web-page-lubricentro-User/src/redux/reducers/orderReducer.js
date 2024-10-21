import {
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  FETCH_ORDERS,
} from "../actions/orderActions";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.order }
            : order
        ),
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case FETCH_ORDERS:
      return { ...state, orders: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
