export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_USERS = "FETCH_USERS";

export const createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});

export const updateUser = (id, user) => ({
  type: UPDATE_USER,
  payload: { id, user },
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const fetchUsers = (users) => ({
  type: FETCH_USERS,
  payload: users,
});
