
import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import TimerIcon from 'material-ui-icons/Timer'
import TimerOffIcon from 'material-ui-icons/TimerOff'
import ChartIcon from 'material-ui-icons/ShowChart'
import { withStyles } from 'material-ui/styles'
import { startTimer, stopTimer, addTime, openAddDialog, openChartDialog } from '../actions'

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

const mapStateToProps = state => ({
  timer: !!state.timer
})

const mapDispatchToProps = dispatch => ({
  openAddDialog: () => {
    dispatch(openAddDialog())
  },
  openChartDialog: () => {
    dispatch(openChartDialog())
  },
  toggleTimer: (timer) => () => {
    if (timer) {
      dispatch(stopTimer())
    } else {
      dispatch(startTimer(() => {
        dispatch(addTime())
      }))
    }
  }
})

const TaskMenu = ({ dispatch, classes, timer, openAddDialog, openChartDialog, toggleTimer }) => {
  return <div className={classes.row}>
    <Button fab color='default' aria-label='add' className={classes.button} onClick={openAddDialog}>
      <AddIcon />
    </Button>
    <Button fab color={timer ? 'primary' : 'default'} aria-label='add' className={classes.button} onClick={toggleTimer(timer)}>
      {timer ? <TimerOffIcon /> : <TimerIcon />}
    </Button>
    <Button fab color='default' aria-label='add' className={classes.button} onClick={openChartDialog}>
      <ChartIcon />
    </Button>
  </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskMenu))
