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
    case "DIRECTORY_UPDATED_SUCCESSFULLY":
      const { payload: updatedDirectory } = action;
      let {
        rootEntries: rootEntriesUpdated,
        children: childrenUpdated
      } = state.data;
      rootEntriesUpdated.forEach(item => {
        if (item.id === updatedDirectory.id) {
          item.name = updatedDirectory.name;
        }
      });
      childrenUpdated.forEach(item => {
        if (item.id === updatedDirectory.id) {
          item.name = updatedDirectory.name;
        }
      });
      return {
        ...state,
        data: { rootEntries: rootEntriesUpdated, children: childrenUpdated },
        error: false
      };
    case "DIRECTORY_DELETED_SUCCESSFULLY":
      const { payload: deletedDirectory } = action;
      let {
        rootEntries: rootEntriesWithoutDeleted,
        children: childrenWithoutDeleted
      } = state.data;
      rootEntriesWithoutDeleted = rootEntriesWithoutDeleted.filter(item => {
        item.id !== deletedDirectory.id;
      });
      childrenWithoutDeleted = childrenWithoutDeleted.filter(item => {
        item.id !== deletedDirectory.id;
      });
      return {
        ...state,
        data: {
          rootEntries: rootEntriesWithoutDeleted,
          children: childrenWithoutDeleted
        },
        error: false
      };
    default:
      return state;
  }
};
