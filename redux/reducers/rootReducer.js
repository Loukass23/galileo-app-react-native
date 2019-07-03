import authReducer from "./authReducer";
import issuesReducer from "./issuesReducer";
import locationReducer from "./locationReducer";
import postIssueReducer from "./postIssueReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer,
  location: locationReducer,
  postIssue: postIssueReducer,
  user: userReducer
});

export default rootReducer;
