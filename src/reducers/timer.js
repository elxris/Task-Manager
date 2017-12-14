
import {START_TIMER, STOP_TIMER} from '../actions'

const timer = (state = 0, action) => {
  switch (action.type) {
    case START_TIMER:
      if (state) clearInterval(state)
      return setInterval(action.timer, 1000)
    case STOP_TIMER:
      if (state) clearInterval(state)
      return 0
    default:
      return state
  }
}

export default timer
