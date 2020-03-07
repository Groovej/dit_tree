import "whatwg-fetch";
import { groupBy } from "underscore";

let currentUserToken;
document.addEventListener("DOMContentLoaded", () => {
  currentUserToken = document.querySelector('meta[name="csrf-token"]').content;
});

const loadDirectoriesData = filters => {
  return dispatch => {
    const path = Routes.data_directories_path();
    fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      }
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then(({ data: payload }) => {
        if (payload) {
          dispatch({ type: "REQUEST_SUCCEEDED", payload });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

export { loadDirectoriesData };
