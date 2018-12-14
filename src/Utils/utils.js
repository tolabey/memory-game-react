import {action} from "../reduxStore/action";

export const utils = {
  testUtil(dispatch) {
    return () => {
      dispatch(action("TEST", 1));
    }
  }
}
