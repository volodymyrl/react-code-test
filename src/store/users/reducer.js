import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from "./actions";

export const initialState = {
  users: [],
  loading: false,
  page: 0,
  showError: false,
  loaded: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        showError: false,
        loaded: true,
        users: [...state.users, ...payload.data],
        total: payload.total,
        per_page: payload.per_page,
        page: payload.page
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        showError: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
