import authReducer from "./authReducer";
import issuesReducer from "./issuesReducer";
import locationReducer from "./locationReducer";
import pictureReducer from "./pictureReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer,
  location: locationReducer,
  pictureURI: pictureReducer
});

export default rootReducer;
