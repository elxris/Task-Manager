
import { connect } from 'react-redux'
import TaskList from '../components/TaskList'
import { VISIBILITY_FILTERS, DURATION_FILTERS, startTimer, stopTimer, addTime, removeTask, finishTask, unfinishTask, moveTaskUp, moveTaskDown, openAddDialog } from '../actions'
const { HIDE_COMPLETED, SHOW_COMPLETED } = VISIBILITY_FILTERS
const { SHORT, MEDIUM, LARGE } = DURATION_FILTERS

const filterByDuration = (durationFilter) => (task) => {
  switch (durationFilter) {
    case SHORT:
      return task.time <= (30 * 60)
    case MEDIUM:
      return task.time >= (30 * 60) && task.time <= (60 * 60)
    case LARGE:
      return task.time > (60 * 60)
    default:
      return true
  }
}

const getVisibleTasks = (tasks, visibilityFilter = HIDE_COMPLETED, durationFilter) => {
  switch (visibilityFilter) {
    case HIDE_COMPLETED:
      return tasks.filter(task => !task.finished).filter(filterByDuration(durationFilter))
    case SHOW_COMPLETED:
      return tasks.filter(filterByDuration(durationFilter))
    default:
      return tasks
  }
}

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state.tasks, state.visibilityFilter, state.durationFilter)
})

const mapDispatchToProps = dispatch => ({
  onTaskStart: () => {
    dispatch(startTimer(() => {
      dispatch(addTime())
    }))
  },
  onTaskStop: () => {
    dispatch(stopTimer())
  },
  onTaskDelete: (id) => {
    dispatch(removeTask(id))
  },
  onTaskDone: (id) => {
    dispatch(finishTask(id))
  },
  onTaskUndone: (id) => {
    dispatch(unfinishTask(id))
  },
  onTaskMoveUp: (id) => {
    dispatch(moveTaskUp(id))
  },
  onTaskMoveDown: (id) => {
    dispatch(moveTaskDown(id))
  },
  openEditDialog: (task) => {
    dispatch(openAddDialog(task))
  }
})

const FilteredTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList)

export default FilteredTaskList
