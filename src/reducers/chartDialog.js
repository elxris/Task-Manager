
import { OPEN_CHART_DIALOG, CLOSE_CHART_DIALOG } from '../actions'

const chartDialog = (state = { open: false }, action) => {
  switch (action.type) {
    case OPEN_CHART_DIALOG:
      return Object.assign({}, state, { open: true })
    case CLOSE_CHART_DIALOG:
      return Object.assign({}, state, { open: false })
    default:
      return state
  }
}

export default chartDialog
