import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import DirectoriesShowComponent from "./components/directories/show";
import DirectoriesIndexComponent from "./components/directories/index";
import history from "./utils/history";

const initializeApplication = () => {
  const store = configureStore();
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/directories/:id"
            component={DirectoriesShowComponent}
          />
          <Route
            exact
            path="/directories"
            component={DirectoriesIndexComponent}
          />
        </Switch>
      </Router>
    </Provider>,
    document.querySelector("#application-root")
  );
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#application-root") && initializeApplication();
});
