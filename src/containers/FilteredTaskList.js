
import { connect } from 'react-redux'
import TaskList from '../components/TaskList'
import { VISIBILITY_FILTERS, startTimer, stopTimer, addTime, removeTask, finishTask, unfinishTask, moveTaskUp, moveTaskDown, openAddDialog } from '../actions'
const { HIDE_COMPLETED, SHOW_COMPLETED } = VISIBILITY_FILTERS

const getVisibleTasks = (tasks, filter = HIDE_COMPLETED) => {
  switch (filter) {
    case HIDE_COMPLETED:
      return tasks.filter(task => !task.finished)
    case SHOW_COMPLETED:
      return [...tasks.filter(task => !task.finished), ...tasks.filter(task => task.finished)]
    default:
      return tasks
  }
}

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state.tasks, state.visibilityFilter)
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
