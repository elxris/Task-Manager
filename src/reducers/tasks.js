import { ADD_TASK, EDIT_TASK, FINISH_TASK, REMOVE_TASK, ADD_TIME } from '../actions'

const tasks = (state = [], action) => {
  const { id, title, description, time, finished, progress = 0 } = action
  switch (action.type) {
    case ADD_TASK:
      return [...state, {
        id, title, description, time, finished: false, progress
      }]
    case EDIT_TASK:
      return state.map(task => task.id === id ? ({id, title, description, time, finished}) : task)
    case FINISH_TASK:
      return state.map(task => task.id === id ? (Object.assign({}, task, {finished: true})) : task)
    case REMOVE_TASK:
      return state.filter(task => task.id !== id)
    case ADD_TIME:
      let first = state.find(task => !task.finished)
      return state.map((task, index) => first.id === task.id ? Object.assign({}, task, {progress: task.progress + 1, finished: (task.progress + 1) >= task.time}) : task)
    default:
      return state
  }
}

export default tasks
