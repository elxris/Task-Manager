import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper, Button, Divider } from 'material-ui'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import FilteredTaskList from './containers/FilteredTaskList'
import TaskMenu from './containers/TaskMenu'
import AddDialog from './containers/AddDialog'
import VisibilityFilter from './containers/VisibilityFilter'
import { addTask } from './actions'

const theme = createMuiTheme({
  palette: {
  }
})

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  generateExampleTasks: () => {
    const milisecondsWeek = 1000 * 60 * 60 * 24 * 7
    const times = new Array(120 / 5).fill(5 * 60).map((value, index) => value + value * index)

    const tasks = []
    for (let i = 0; i < 50; i++) {
      // Pick random time
      let time = times[Math.floor(Math.random() * times.length)]

      // Add its to a list
      tasks.push({
        title: `Tarea ${i + 1}`,
        description: `Lorem Ipsum Dolor ...`,
        time,
        progress: Math.ceil((0.8 + Math.random() * 0.2) * time),
        finished: Date.now() - Math.ceil(Math.random() * milisecondsWeek)
      })
    }
    tasks.sort((a, b) => b.finished - a.finished)
    tasks.forEach(task => dispatch(addTask(task)))
  }
})

class App extends Component {
  render () {
    const { classes, generateExampleTasks } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AddDialog />
          <Paper>
            {/* <Header /> */}
            <TaskMenu />
            <VisibilityFilter />
            <Divider />
            <FilteredTaskList />
          </Paper>
          <Button onClick={generateExampleTasks}>
            Insertar 50 elementos de prueba
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
