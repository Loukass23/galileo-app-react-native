import authReducer from './authReducer'
import issuesReducer from './issuesReducer'

import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    auth: authReducer,
    issues: issuesReducer,
});


export default rootReducer
