import constants from "@strings";
import clientUtils from "@utils/client-utils";

const reducer = (
  state = {
    rooms: {},
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case "ROOM-UPDATE-DATA":
      newState = { ...state, ...(action.data || {}) };
      return newState;
    default:
      return state;
  }
};
export default reducer;
