import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import users from "./users/reducer";
import usersSagas from "./users/sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const rootReducers = combineReducers({
  users
});

const composeEnhancers =
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(rootReducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

//run the saga
sagaMiddleware.run(usersSagas);

export default store;
