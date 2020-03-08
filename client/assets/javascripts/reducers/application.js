const initialState = {
  data: {}
};

export const application = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_FAILED":
      const { payload = {} } = action;
      const { errorMessage = "" } = payload;
      return {
        ...state,
        error: true,
        errorMessage
      };
    case "REQUEST_SUCCEEDED":
      const { payload: data } = action;
      return { ...state, data, error: false };
    case "DIRECTORY_ADDED_SUCCESSFULLY":
      const { payload: newDirectory } = action;
      let { rootEntries, children } = state.data;
      Object.is(newDirectory.mpath, null)
        ? rootEntries.push(newDirectory)
        : children.push(newDirectory);
      return { ...state, data: { rootEntries, children }, error: false };
    default:
      return state;
  }
};
