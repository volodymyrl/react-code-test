import { combineReducers } from "redux";
import { testReducer } from "../../helpers";
import users, { initialState } from "./reducer";
import { fetchUsers, fetchUsersSuccess, fetchUsersError } from "./actions";
import {
  selectUsers,
  selectLoading,
  selectPage,
  selectIsShowError,
  selectIsShowNoResults,
  selectLoaded,
  selectIsAllUsersLoaded
} from "./selectors";

const reducer = combineReducers({ users });
const user = { id: 1 };
const usersResponse = {
  data: [user],
  page: 1,
  per_page: 1,
  total: 2
};

describe("users reducer", () => {
  it("should represent initial state", () => {
    expect(users(undefined, { type: "ANY" })).toEqual(initialState);
  });

  it("should show loading on fetchUsers", () => {
    testReducer(reducer)
      .expect(selectLoading, false)
      .put(fetchUsers())
      .expect(selectLoading, true);
  });

  it("should handle fetch users success", () => {
    testReducer(reducer)
      .expect(selectLoaded, false)
      .expect(selectUsers, [])
      .expect(selectPage, 0)
      .expect(selectLoading, false)
      .put(fetchUsers())
      .expect(selectLoading, true)
      .put(fetchUsersSuccess(usersResponse))
      .expect(selectLoaded, true)
      .expect(selectUsers, [user])
      .expect(selectPage, usersResponse.page)
      .expect(selectLoading, false)
      .expect(selectIsShowError, false)
      .put(fetchUsersSuccess(usersResponse))
      .expect(selectUsers, [user, user])
      .expect(selectIsShowNoResults, false);
  });

  it("should clear error on user load", () => {
    testReducer(reducer)
      .expect(selectIsShowError, false)
      .put(fetchUsersError())
      .expect(selectIsShowError, true)
      .put(fetchUsers())
      .expect(selectIsShowError, false);
  });

  it("should represent all user loaded state", () => {
    testReducer(reducer)
      .expect(selectIsAllUsersLoaded, false)
      .put(fetchUsersSuccess({ ...usersResponse, total: 1 }))
      .expect(selectIsAllUsersLoaded, true);
  });

  it("should no user for loading state", () => {
    testReducer(reducer)
      .expect(selectIsShowNoResults, false)
      .put(fetchUsersSuccess({ data: [], total: 0 }))
      .expect(selectIsShowNoResults, true);
  });
});
