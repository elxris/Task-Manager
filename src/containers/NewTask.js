
import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'
import { addTask } from '../actions'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})

const onClickHandler = (time, dispatch) => () => {
  dispatch(addTask({title: 'lmao', description: 'lmao', time: time * 60}))
}

const NewTask = ({ dispatch, classes }) => {
  return <div className={classes.row}>
    <Button fab color='primary' aria-label='add' className={classes.button} onClick={onClickHandler(20, dispatch)}>
      <AddIcon />
    </Button>
  </div>
}

export default connect()(withStyles(styles)(NewTask))
