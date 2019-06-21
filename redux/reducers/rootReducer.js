import authReducer from "./authReducer";
import issuesReducer from "./issuesReducer";
import locationReducer from "./locationReducer";
import pictureReducer from "./pictureReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer,
  location: locationReducer,
  pictureURI: pictureReducer,
  user: userReducer
});

export default rootReducer;
