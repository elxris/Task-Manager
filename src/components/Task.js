
import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Delete from 'material-ui-icons/Delete'

const Task = ({title, description, id, onTaskDelete}) => {
  return <ListItem>
    <ListItemText primary={title} secondary={description} />
    <ListItemSecondaryAction>
      <Delete onClick={() => onTaskDelete(id)} />
    </ListItemSecondaryAction>
  </ListItem>
}

export default Task
