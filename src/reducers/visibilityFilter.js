import { SET_VISIBILITY_FILTER, TOGGLE_VISIBILITY_FILTER, VISIBILITY_FILTERS } from '../actions/index'
const { HIDE_COMPLETED, SHOW_COMPLETED } = VISIBILITY_FILTERS

const visibilityFilter = (state = SHOW_COMPLETED, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    case TOGGLE_VISIBILITY_FILTER:
      return state === HIDE_COMPLETED ? SHOW_COMPLETED : HIDE_COMPLETED
    default:
      return state
  }
}

export default visibilityFilter
