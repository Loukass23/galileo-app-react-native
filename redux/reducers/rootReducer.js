import authReducer from './authReducer'
import issuesReducer from './issuesReducer'
import locationReducer from './locationReducer'

import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    auth: authReducer,
    issues: issuesReducer,
    location: locationReducer,
});


export default rootReducer
