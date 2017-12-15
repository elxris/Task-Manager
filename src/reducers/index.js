import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import durationFilter from './durationFilter'
import tasks from './tasks'
import timer from './timer'
import dialog from './dialog'

const taskApp = combineReducers({
  timer,
  tasks,
  visibilityFilter,
  durationFilter,
  dialog
})

export default taskApp
