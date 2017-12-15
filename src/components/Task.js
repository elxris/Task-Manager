
import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Delete from 'material-ui-icons/Delete'
import Done from 'material-ui-icons/Done'
import Replay from 'material-ui-icons/Replay'
import Up from 'material-ui-icons/KeyboardArrowUp'
import Down from 'material-ui-icons/KeyboardArrowDown'
import { LinearProgress, Tooltip, Grid, IconButton } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const formatTime = time => `${time >= (60 * 60) ? `${Math.floor(time / (60 * 60))}:` : ''}${('00' + (Math.floor(time / 60) % 60)).slice(-2)}:${('00' + (time % 60)).slice(-2)}`

const styles = theme => ({
  whiteSpace: {
    whiteSpace: 'pre-wrap'
  }
})

const Task = ({ classes, task, title, description, id, progress, time, finished, first, last, onTaskDelete, onTaskDone, onTaskUndone, onTaskMoveUp, onTaskMoveDown, openEditDialog }) => {
  return <div>
    <ListItem onClick={() => openEditDialog(task)}>
      <ListItemText primary={title} secondary={description + `\n${formatTime(progress)} / ${formatTime(time)} - ${(100 * progress / time).toFixed(2)}%${finished ? `\nTerminada ${moment(finished).fromNow()}` : ''}`} classes={{text: classes.whiteSpace}} />
      <ListItemSecondaryAction>
        <Grid container spacing={0}>
          {(progress || finished) && <Grid item><Tooltip id='tooltip-clear' title='Resetear' placement='top'><IconButton onClick={() => onTaskUndone(id)}><Replay /></IconButton></Tooltip></Grid>}
          {!finished && !first && <Grid item><Tooltip id='tooltip-top' title='Mover arriba' placement='top'><IconButton onClick={() => onTaskMoveUp(id)}><Up /></IconButton></Tooltip></Grid>}
          {!finished && !last && <Grid item><Tooltip id='tooltip-down' title='Mover abajo' placement='top'><IconButton onClick={() => onTaskMoveDown(id)}><Down /></IconButton></Tooltip></Grid>}
          {!finished && <Grid item><Tooltip id='tooltip-done' title='Terminar' placement='top'><IconButton onClick={() => onTaskDone(id)}><Done /></IconButton></Tooltip></Grid>}
          <Grid item><Tooltip id='tooltip-delete' title='Borrar' placement='top'><IconButton onClick={() => onTaskDelete(id)}><Delete /></IconButton></Tooltip></Grid>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
    {finished && <LinearProgress value={Math.floor(100 * progress / time)} mode='determinate' color={finished ? 'primary' : 'accent'} />}
  </div>
}

export default withStyles(styles)(Task)
