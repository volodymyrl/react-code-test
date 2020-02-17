import { put, takeLatest, call, select } from "redux-saga/effects";
import { API_URL } from "../../constants";
import { selectPage } from "./selectors";
import { LOAD_USERS, fetchUsers, fetchUsersSuccess, fetchUsersError } from "./actions";

export function* fetchUsersSaga() {
  yield put(fetchUsers());
  const page = yield select(selectPage);
  try {
    const apiUrl = `${API_URL}?page=${page + 1}`;
    const response = yield call(fetch, apiUrl);
    const body = yield call([response, "text"]);
    const data = body.length ? JSON.parse(body) : {};
    yield put(fetchUsersSuccess(data));
  } catch (err) {
    console.error(err.message);
    yield put(fetchUsersError());
  }
}

function* userSaga() {
  yield takeLatest(LOAD_USERS, fetchUsersSaga);
}

export default userSaga;
