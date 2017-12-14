import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import FilteredTaskList from './containers/FilteredTaskList'

const theme = createMuiTheme({
  palette: {
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {/* <Header /> */}
          <FilteredTaskList />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
