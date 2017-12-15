import uuid from 'uuid/v1' // Importamos v1

export const ADD_TASK = 'ADD_TASK'
export const addTask = ({title, description, time}) => ({
  type: ADD_TASK,
  id: uuid(),
  title,
  description,
  time,
  progress: 0,
  finished: false
})

export const EDIT_TASK = 'EDIT_TASK'
export const editTask = ({id, title, description, time, finished = false}) => ({
  type: EDIT_TASK,
  id,
  title,
  description,
  time,
  finished
})

export const REMOVE_TASK = 'REMOVE_TASK'
export const removeTask = id => ({
  type: REMOVE_TASK,
  id
})

export const FINISH_TASK = 'FINISH_TASK'
export const finishTask = id => ({
  type: FINISH_TASK,
  id
})

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  HIDE_COMPLETED: 'HIDE_COMPLETED'
}
export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const startTimer = timer => ({
  type: START_TIMER,
  timer
})
export const stopTimer = () => ({
  type: STOP_TIMER
})

export const ADD_TIME = 'ADD_TIME'
export const addTime = () => ({
  type: ADD_TIME
})

export const OPEN_ADD_DIALOG = 'OPEN_ADD_DIALOG'
export const CLOSER_ADD_DIALOG = 'CLOSER_ADD_DIALOG'
export const EDIT_ADD_DIALOG = 'EDIT_ADD_DIALOG'
export const openAddDialog = ({ id, title, description, time } = {}) => ({
  type: OPEN_ADD_DIALOG,
  id,
  title,
  description,
  time
})
export const closeAddDialog = () => ({
  type: CLOSER_ADD_DIALOG
})
export const editAddDialog = ({id, title, description, minutes, seconds}) => ({
  type: EDIT_ADD_DIALOG,
  id,
  title,
  description,
  minutes,
  seconds
})

export const OPEN_DELETE_CONFIRM_DIALOG = 'OPEN_DELETE_CONFIRM_DIALOG'
export const CLOSE_DELETE_CONFIRM_DIALOG = 'CLOSE_DELETE_CONFIRM_DIALOG'
export const openDeleteConfirmDialog = ({ id }) => ({
  type: OPEN_DELETE_CONFIRM_DIALOG,
  id
})
export const closeDeleteConfirmDialog = ({ confirm = false }) => ({
  type: CLOSE_DELETE_CONFIRM_DIALOG,
  confirm
})
