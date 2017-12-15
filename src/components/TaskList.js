
import React from 'react'
import List from 'material-ui/List'
import Task from './Task'

const TaskList = ({tasks, onTaskDelete}) => {
  return <List>
    {tasks.map(task => <Task key={task.id} {...task} onTaskDelete={onTaskDelete} />)}
  </List>
}

export default TaskList
