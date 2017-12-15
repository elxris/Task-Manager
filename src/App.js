import React, { Component } from 'react'
import { Paper, Grid, Button } from 'material-ui'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import FilteredTaskList from './containers/FilteredTaskList'
import TaskMenu from './containers/TaskMenu'
import AddDialog from './containers/AddDialog'

const theme = createMuiTheme({
  palette: {
  }
})

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

class App extends Component {
  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AddDialog />
          <Grid>
            <Paper>
              {/* <Header /> */}
              <TaskMenu />
              {/* <VisibilityFilter /> */}
              <FilteredTaskList />
            </Paper>
            <Button>
              Insertar 50 elementos completados
            </Button>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
