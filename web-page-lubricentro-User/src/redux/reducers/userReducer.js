import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
} from "../actions/userActions";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.user }
            : user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case FETCH_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default userReducer;
