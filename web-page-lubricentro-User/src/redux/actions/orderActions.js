export const CREATE_ORDER = "CREATE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const createOrder = (order) => ({
  type: CREATE_ORDER,
  payload: order,
});

export const updateOrder = (id, order) => ({
  type: UPDATE_ORDER,
  payload: { id, order },
});

export const deleteOrder = (id) => ({
  type: DELETE_ORDER,
  payload: id,
});

export const fetchOrders = (orders) => ({
  type: FETCH_ORDERS,
  payload: orders,
});
