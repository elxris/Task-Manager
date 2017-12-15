
import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import TimerIcon from 'material-ui-icons/Timer'
import TimerOffIcon from 'material-ui-icons/TimerOff'
import { withStyles } from 'material-ui/styles'
import { startTimer, stopTimer, addTime, openAddDialog } from '../actions'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  container: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const startStopTimer = (dispatch, timer) => () => {
  if (timer) {
    dispatch(stopTimer())
  } else {
    dispatch(startTimer(() => {
      dispatch(addTime())
    }))
  }
}

const mapStateToProps = state => ({
  timer: !!state.timer,
  dialog: state.dialog
})

const TaskMenu = ({ dispatch, classes, timer, dialog }) => {
  return <div className={classes.row}>
    <Button fab color='primary' aria-label='add' className={classes.button} onClick={() => dispatch(openAddDialog())}>
      <AddIcon />
    </Button>
    <Button fab color={timer ? 'accent' : 'primary'} aria-label='add' className={classes.button} onClick={startStopTimer(dispatch, timer)}>
      {timer ? <TimerOffIcon /> : <TimerIcon />}
    </Button>
  </div>
}

export default connect(mapStateToProps)(withStyles(styles)(TaskMenu))
