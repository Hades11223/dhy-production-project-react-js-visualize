import constants from "@strings";
import clientUtils from "@utils/client-utils";

const reducer = (
  state = {
    invoice: {},
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case "INVOICE-UPDATE-DATA":
      newState = { ...state, ...(action.data || {}) };
      return newState;
    default:
      return state;
  }
};
export default reducer;
