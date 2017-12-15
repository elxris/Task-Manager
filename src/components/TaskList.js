
import React from 'react'
import List from 'material-ui/List'
import Task from './Task'

const TaskList = (props) => {
  const { tasks } = props
  let firstItem = tasks.find(t => !t.finished)
  let lastItem = Array.from(tasks).reverse().find(t => !t.finished)

  return <List>
    {tasks.map(task =>
      <Task
        key={task.id}
        {...task}
        task={task}
        first={firstItem === task}
        last={lastItem === task}
        {...props}
      />
    )}
  </List>
}

export default TaskList
