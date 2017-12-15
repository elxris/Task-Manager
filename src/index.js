import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import todoApp from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

let saveToLocalStorage = ({ getState }) => next => action => {
  let { tasks } = getState()
  let save = { tasks }
  localStorage.setItem('state', JSON.stringify(save))
  return next(action)
}

let store = createStore(todoApp, JSON.parse(localStorage.getItem('state')) || {}, applyMiddleware(saveToLocalStorage))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
