import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer,  { initializeAnecdotes } from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import store from './store'




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
