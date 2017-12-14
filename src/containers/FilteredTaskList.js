
import { connect } from 'react-redux'
import TaskList from '../components/TaskList'
import { VISIBILITY_FILTERS, startTimer, stopTimer, addTime } from '../actions'
const { HIDE_COMPLETED, SHOW_COMPLETED } = VISIBILITY_FILTERS

const getVisibleTasks = (tasks, filter = HIDE_COMPLETED) => {
  switch (filter) {
    case HIDE_COMPLETED:
      return tasks.filter(task => task.finished)
    case SHOW_COMPLETED:
      return tasks
  }
}

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state.tasks, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  onTaskStart: id => {
    dispatch(startTimer(() => {
      dispatch(addTime())
    }))
  },
  onTaskStop: id => {
    dispatch(stopTimer())
  }
})

const FilteredTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList)

export default FilteredTaskList
