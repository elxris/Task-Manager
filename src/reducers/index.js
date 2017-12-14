import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import tasks from './tasks'

const taskApp = combineReducers({
  tasks,
  visibilityFilter
})

export default taskApp
