import { ADD_TASK, EDIT_TASK, FINISH_TASK, REMOVE_TASK, ADD_TIME, MOVE_TASK_UP, MOVE_TASK_DOWN, UNFINISH_TASK } from '../actions'

const tasks = (state = [], action) => {
  const { id, title, description, time, finished = false, progress, createdAt } = action
  let tasksFinished, tasksPending, item
  switch (action.type) {
    case ADD_TASK:
      tasksFinished = state.filter(t => t.finished)
      tasksPending = state.filter(t => !t.finished)
      let newTask = { id, title, description, time, finished, progress, createdAt }

      if (!finished) {
        // Si es una nueva tarea, no hay necesidad de reordenar
        tasksPending.push(newTask)
      } else {
        tasksFinished.push(newTask)
        tasksFinished.sort((a, b) => b.finished - a.finished)
      }
      return [].concat(tasksPending, tasksFinished)
    case EDIT_TASK:
      return state.map(task => task.id === id ? Object.assign({}, task, {id, title, description, time, progress: 0}, finished && {finished}, createdAt && {createdAt}) : task)
    case FINISH_TASK:
    case UNFINISH_TASK:
      item = state.find(task => task.id === id)
      state.splice(state.indexOf(item), 1)
      Object.assign(item, { finished: action.type === FINISH_TASK ? Date.now() : false })
      tasksPending = state.filter(t => !t.finished)
      tasksFinished = state.filter(t => t.finished)
      return [].concat(tasksPending, item, tasksFinished)
    case REMOVE_TASK:
      return state.filter(task => task.id !== id)
    case MOVE_TASK_UP:
    case MOVE_TASK_DOWN:
      let { up } = action
      // Separamos las tareas en dos arreglos para solo mover los objetos en la lista de las pendientes
      tasksFinished = state.filter(t => t.finished)
      tasksPending = state.filter(t => !t.finished)
      let oldPos = tasksPending.findIndex(t => t.id === id)
      if (oldPos === -1) return state
      // Remove the element from the position
      item = tasksPending.splice(oldPos, 1)
      // Add again the item
      tasksPending.splice(oldPos + (up ? -1 : 1), 0, ...item)
      return [].concat(tasksPending, tasksFinished)
    case ADD_TIME:
      // Busca el primer elemento de la lista que no esté terminado
      let first = state.find(task => !task.finished)
      if (!first) return state
      // El centinela me permitirá conocer si una tarea terminó
      let centinela = 0
      let newState = state.map((task, index) => first.id === task.id ? Object.assign({}, task, {progress: task.progress + 1, finished: (task.progress + 1) >= task.time ? (centinela++, Date.now()) : false}) : task)
      // Si hubo algún cambio, reordena
      if (centinela) {
        let tasksFinished = newState.filter(t => t.finished)
        let tasksPending = newState.filter(t => !t.finished)
        // Reordena las terminadas
        tasksFinished.sort((a, b) => b.finished - a.finished)
        return [].concat(tasksPending, tasksFinished)
      } else {
        return newState
      }
    default:
      return state
  }
}

export default tasks
