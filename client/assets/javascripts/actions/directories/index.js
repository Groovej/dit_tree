import "whatwg-fetch";
import { groupBy, partition } from "underscore";
import { push } from "react-router-redux";

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
      .then(({ data }) => {
        if (data) {
          const [rootEntries, children] = partition(data, ({ mpath }) =>
            Object.is(mpath, null)
          );

          dispatch({
            type: "REQUEST_SUCCEEDED",

            payload: { rootEntries, children }
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

const changePath = id => {
  return dispatch => dispatch(push(`/directories/${id}`));
};

const addNewDirectory = params => {
  return dispatch => {
    const path = Routes.directories_path();

    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      },
      credentials: "same-origin",
      body: JSON.stringify({ directory: params })
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then(({ directory: payload }) => {
        if (payload) {
          dispatch({
            type: "DIRECTORY_ADDED_SUCCESSFULLY",
            payload
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};
const updateDirectory = ({ parent_id: id, name }) => {
  return dispatch => {
    const path = Routes.directory_path({ id });

    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      },
      credentials: "same-origin",
      body: JSON.stringify({ name })
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then(({ directory: payload }) => {
        if (payload) {
          dispatch({
            type: "DIRECTORY_UPDATED_SUCCESSFULLY",
            payload
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};
const deleteDirectory = id => {
  return dispatch => {
    const path = Routes.directory_path(id);

    fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUserToken
      },
      credentials: "same-origin"
    })
      .catch(response => dispatch({ type: "REQUEST_FAILED" }))
      .then(response => response.json())
      .then(({ directory: payload }) => {
        if (payload) {
          dispatch(push("/directories"));
          dispatch({
            type: "DIRECTORY_DELETED_SUCCESSFULLY",
            payload
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            payload: { errorMessage: "Something went wront. Please try later" }
          });
        }
      });
  };
};

export {
  loadDirectoriesData,
  changePath,
  addNewDirectory,
  updateDirectory,
  deleteDirectory
};
