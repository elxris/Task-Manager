
import {SET_DURATION_FILTER, DURATION_FILTERS} from '../actions'
const {NONE} = DURATION_FILTERS

const durationFilter = (state = NONE, action) => {
  switch (action.type) {
    case SET_DURATION_FILTER:
      return action.filter
    default:
      return state
  }
}

export default durationFilter
