import { ADD_TASK, EDIT_TASK, FINISH_TASK, REMOVE_TASK, ADD_TIME, MOVE_TASK_UP, MOVE_TASK_DOWN, UNFINISH_TASK } from '../actions'

const tasks = (state = [], action) => {
  const { id, title, description, time, finished = false, progress, createdAt } = action
  switch (action.type) {
    case ADD_TASK:
      return [...state, {
        id, title, description, time, finished, progress, createdAt
      }]
    case EDIT_TASK:
      return state.map(task => task.id === id ? Object.assign({}, task, {id, title, description, time, progress: 0}, finished && {finished}, createdAt && {createdAt}) : task)
    case FINISH_TASK:
      return state.map(task => task.id === id ? Object.assign({}, task, { finished: Date.now() }) : task)
    case UNFINISH_TASK:
      return state.map(task => task.id === id ? Object.assign({}, task, { finished: false, progress: task.finished ? task.progress : 0 }) : task)
    case REMOVE_TASK:
      return state.filter(task => task.id !== id)
    case MOVE_TASK_UP:
    case MOVE_TASK_DOWN:
      let { up } = action
      // Separamos las tareas en dos arreglos para solo mover los objetos en la lista de las pendientes
      let tasksFinished = state.filter(t => t.finished)
      let tasksPending = state.filter(t => !t.finished)
      let oldPos = tasksPending.findIndex(t => t.id === id)
      if (oldPos === -1) return state
      // Remove the element from the position
      let item = tasksPending.splice(oldPos, 1)
      // Add again the item
      tasksPending.splice(oldPos + (up ? -1 : 1), 0, ...item)
      return [...tasksPending, ...tasksFinished]
    case ADD_TIME:
      let first = state.find(task => !task.finished)
      if (!first) return state
      return state.map((task, index) => first.id === task.id ? Object.assign({}, task, {progress: task.progress + 1, finished: (task.progress + 1) >= task.time ? Date.now() : false}) : task)
    default:
      return state
  }
}

export default tasks
