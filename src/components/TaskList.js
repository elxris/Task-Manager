
import React from 'react'
import List from 'material-ui/List'
import Task from './Task'

const TaskList = ({tasks, onTaskDelete}) => {
  return <List>
    {tasks.map(task => <Task key={task.id} title={task.title} description={task.description} id={task.id} onTaskDelete={onTaskDelete} />)}
  </List>
}

export default TaskList
