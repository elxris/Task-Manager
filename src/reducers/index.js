import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import durationFilter from './durationFilter'
import tasks from './tasks'
import timer from './timer'
import addDialog from './addDialog'
import chartDialog from './chartDialog'

const taskApp = combineReducers({
  timer,
  tasks,
  visibilityFilter,
  durationFilter,
  addDialog,
  chartDialog
})

export default taskApp
