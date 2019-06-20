import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import timerMiddleware from 'redux-timer';

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    applyMiddleware(timerMiddleware)
))

export { store }