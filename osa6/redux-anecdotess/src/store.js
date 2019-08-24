import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  })

const store = createStore(reducer, applyMiddleware(thunk))

export default store