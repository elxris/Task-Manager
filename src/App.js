import React, { Component } from 'react'
import { Paper, Grid } from 'material-ui'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import FilteredTaskList from './containers/FilteredTaskList'
import NewTask from './containers/NewTask'

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
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid>
            <Paper>

              {/* <Header /> */}
              <NewTask />
              {/* <VisibilityFilter /> */}
              <FilteredTaskList />
            </Paper>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
