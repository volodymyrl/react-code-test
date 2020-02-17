import { createAction } from "../../helpers";

// actions
export const LOAD_USERS = "LOAD_USERS";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

// actions creators
export const loadUsers = createAction(LOAD_USERS);
export const fetchUsers = createAction(FETCH_USERS);
export const fetchUsersError = createAction(FETCH_USERS_ERROR);
export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS);
