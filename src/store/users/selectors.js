import { createSelector } from "reselect";

const selectShowError = state => state.users.showError;
export const selectLoaded = state => state.users.loaded;
export const selectUsers = state => state.users.users;
export const selectLoading = state => state.users.loading;
export const selectPage = state => state.users.page;
export const selectTotal = state => state.users.total;

export const selectIsShowNoResults = createSelector(
  selectLoaded,
  selectLoading,
  selectShowError,
  selectUsers,
  (loaded, loading, error, users) => loaded && !loading && !error && users.length === 0
);

export const selectIsShowError = createSelector(selectLoading, selectShowError, (loading, error) => !loading && error);
export const selectIsAllUsersLoaded = createSelector(
  selectUsers,
  selectTotal,
  (users, total) => users.length === total && users.length !== 0
);
