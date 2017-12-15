import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import tasks from './tasks'
import timer from './timer'
import dialog from './dialog'

const taskApp = combineReducers({
  timer,
  tasks,
  visibilityFilter,
  dialog
})

export default taskApp
