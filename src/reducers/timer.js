
import {START_TIMER, STOP_TIMER, SET_DURATION_FILTER} from '../actions'

const timer = (state = { interval: false, filter: true, action: false }, action) => {
  switch (action.type) {
    case START_TIMER:
      if (state) clearInterval(state)
      return Object.assign({}, {
        interval: setInterval(action.timer(state.filter), 1000),
        action: action.timer
      })
    case STOP_TIMER:
      if (state) clearInterval(state.interval)
      return Object.assign({ interval: false })
    case SET_DURATION_FILTER:
      return Object.assign({}, state, { filter: action.filter }, { interval: state.interval && (clearInterval(state.interval) || true) && setInterval(state.action(action.filter), 1000) })
    default:
      return state
  }
}

export default timer
