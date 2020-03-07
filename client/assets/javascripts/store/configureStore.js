import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../utils/history";

const configureStore = initialState => {
  const isDev = process.env.NODE_ENV === "development";
  const routeMiddleware = routerMiddleware(history);
  let middlwares = isDev
    ? [thunk, routeMiddleware, createLogger()]
    : [routeMiddleware, thunk];
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlwares)
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
