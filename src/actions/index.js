import uuid from 'uuid/v1' // Importamos v1

export const ADD_TASK = 'ADD_TASK'
export const addTask = ({title, description, time}) => ({
  type: ADD_TASK,
  id: uuid(),
  title,
  description,
  time
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
export const stopTimer = timer => ({
  type: STOP_TIMER
})

export const ADD_TIME = 'ADD_TIME'
export const addTime = () => ({
  type: ADD_TIME
})
