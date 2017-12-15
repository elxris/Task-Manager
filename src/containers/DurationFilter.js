
import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Grid, FormControlLabel, Radio, Typography } from 'material-ui'
import { DURATION_FILTERS, setDurationFilter } from '../actions'
const { NONE, SHORT, MEDIUM, LARGE } = DURATION_FILTERS

const mapStateToProps = state => ({
  filter: state.durationFilter
})

const mapDispatchToProps = dispatch => ({
  onChange: (filter) => () => {
    dispatch(setDurationFilter(filter))
  }
})

const DurationFilter = ({filter, onChange}) => {
  return <List>
    <ListItem>
      <Typography type='body2'>
        Filtra por duración:
      </Typography>
      <Grid container justify='space-between'>
        {[['Todas', NONE], ['Corta', SHORT], ['Media', MEDIUM], ['Larga', LARGE]].map(([name, _filter]) => <Grid key={name} item>
          <FormControlLabel control={<Radio checked={filter === _filter} onChange={onChange(_filter)} />} label={name} />
        </Grid>)}
      </Grid>
    </ListItem>
  </List>
}

export default connect(mapStateToProps, mapDispatchToProps)(DurationFilter)
