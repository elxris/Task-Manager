
import React from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { red, blue, green, indigo } from 'material-ui/colors'
import Chartjs from 'chart.js'
import { closeChartDialog } from '../actions'
import moment from 'moment'

const getDurationGroup = ({time}) => {
  if (time <= (30 * 60)) {
    return 0
  } else if (time <= (60 * 60)) {
    return 1
  } else {
    return 2
  }
}

const getDayEstimate = ({finished}) => {
  return new Array(7).fill(0).map((val, index) => index).reverse().map(days => moment().startOf('day').subtract(days, 'days')).findIndex(time => moment(finished).isBetween(time, moment(time).add(1, 'day')))
}

const mapStateToProps = state => ({
  dialog: state.chartDialog,
  data: {
    labels: new Array(7).fill(0).map((val, index) => index).reverse().map(val => moment().subtract(val, 'days').format('ddd D')),
    datasets: state.chartDialog.open && state.tasks.filter(task => task.finished && moment(task.finished).isAfter(moment().startOf('day').subtract(6, 'days'))).reduce((reduced, task) => {
      let durationGroup = getDurationGroup(task)
      let dayEstimate = getDayEstimate(task)
      ;reduced[durationGroup].data[dayEstimate]++
      ;reduced[3].data[dayEstimate]++
      console.log(durationGroup, dayEstimate)
      return reduced
    }, [{
      label: 'Tareas Cortas',
      backgroundColor: red[500],
      stack: 'Filtros',
      data: new Array(7).fill(0)
    }, {
      label: 'Tareas Medias',
      backgroundColor: blue[500],
      stack: 'Filtros',
      data: new Array(7).fill(0)
    }, {
      label: 'Tareas Largas',
      backgroundColor: green[500],
      stack: 'Filtros',
      data: new Array(7).fill(0)
    }, {
      label: 'Todas las tareas',
      backgroundColor: indigo[500],
      stack: 'Todas',
      data: new Array(7).fill(0)
    }])
  }
})

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeChartDialog())
  }
})

const drawThatChart = (ref, data) => {
  let ctx = ref.getContext('2d')
  ;(() => new Chartjs(ctx, {
    type: 'bar',
    data,
    options: {
      animation: false,
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          },
          stacked: true
        }]
      }
    }
  }))()
}

const ChartDialog = ({ dialog, data, onClose }) => {
  const { open } = dialog
  return <Dialog open={open} onRequestClose={onClose}>
    <canvas width='400' height='400' ref={ref => ref && drawThatChart(ref, data)} />
  </Dialog>
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartDialog)
