
import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Delete from 'material-ui-icons/Delete'
import { LinearProgress } from 'material-ui'

const Task = ({title, description, id, onTaskDelete, progress, time}) => {
  return <div>
    <ListItem>
      <ListItemText primary={title} secondary={description + `${progress}/${time}`} />
      <ListItemSecondaryAction>
        <Delete onClick={() => onTaskDelete(id)} />
      </ListItemSecondaryAction>
    </ListItem>
    {progress ? <LinearProgress value={Math.floor(100 * progress / time)} mode='determinate' /> : null}
  </div>
}

export default Task
