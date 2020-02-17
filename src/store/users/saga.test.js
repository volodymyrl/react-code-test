import { testSaga } from "redux-saga-test-plan";
import { API_URL } from "../../constants";
import { LOAD_USERS, fetchUsers, fetchUsersError, fetchUsersSuccess } from "./actions";
import { selectPage } from "./selectors";
import userSaga, { fetchUsersSaga } from "./sagas";

describe("user saga test", () => {
  it("userSaga", () => {
    testSaga(userSaga)
      .next()
      .takeLatest(LOAD_USERS, fetchUsersSaga)

      .next()
      .isDone();
  });

  describe("fetchUsersSaga", () => {
    const page = 1;
    const apiUrl = `${API_URL}?page=${page + 1}`;
    const data = [{ id: 1 }];
    const response = {
      text: () => JSON.stringify(data)
    };

    it("should fetch new users", () => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers())

        .next()
        .select(selectPage)

        .next(page)
        .call(fetch, apiUrl)

        .next(response)
        .call([response, "text"])

        .next(JSON.stringify(data))
        .put(fetchUsersSuccess(data))

        .next()
        .isDone();
    });

    it("should handle error", () => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers())

        .next()
        .select(selectPage)

        .next(page)
        .call(fetch, apiUrl)

        .throw(new Error())
        .put(fetchUsersError())

        .next()
        .isDone();
    });
  });
});
