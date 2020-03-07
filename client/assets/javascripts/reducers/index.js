import { combineReducers } from "redux";
import { application } from "./application";
import { routerReducer as routing } from "react-router-redux";

export default combineReducers({
  application,
  routing
});
