
import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from 'material-ui'
import { VISIBILITY_FILTERS, toggleVisibilityFilter } from '../actions'
const { SHOW_COMPLETED } = VISIBILITY_FILTERS

const mapStateToProps = state => ({
  completed: state.visibilityFilter === SHOW_COMPLETED
})

const mapDispatchToProps = dispatch => ({
  onChange: () => {
    dispatch(toggleVisibilityFilter())
  }
})

const VisibilityFilter = ({ completed, onChange }) => {
  return <List>
    <ListItem>
      <ListItemText primary='Completados' />
      <ListItemSecondaryAction>
        <Switch
          onChange={onChange}
          checked={completed}
        />
      </ListItemSecondaryAction>
    </ListItem>
  </List>
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilter)
