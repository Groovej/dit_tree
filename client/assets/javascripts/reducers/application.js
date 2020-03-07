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
        errorMessage,
        successMessage: ""
      };
    case "REQUEST_SUCCEEDED":
      const { payload: data } = action;
      return { ...state, data, error: false };
    default:
      return state;
  }
};
