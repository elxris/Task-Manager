import {SET_VISIBILITY_FILTER, VISIBILITY_FILTERS} from '../actions/index'

const visibilityFilter = (state = VISIBILITY_FILTERS.HIDE_COMPLETED, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
