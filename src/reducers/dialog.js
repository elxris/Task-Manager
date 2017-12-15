import { OPEN_ADD_DIALOG, CLOSER_ADD_DIALOG, EDIT_ADD_DIALOG } from '../actions'

const dialog = (state = {}, action) => {
  let { id, title, description, minutes, seconds, time } = action
  switch (action.type) {
    case OPEN_ADD_DIALOG:
      if (time) {
        minutes = Math.floor(time / 60)
        seconds = time % 60
      }
      return Object.assign({}, {open: true, id, title, description, minutes, seconds})
    case CLOSER_ADD_DIALOG:
      return ({open: false})
    case EDIT_ADD_DIALOG:
      return Object.assign({}, state, {id, title, description, minutes, seconds})
    default:
      return state
  }
}

export default dialog
