import React from 'react';
import Task from './Task.jsx';

class Tasks extends React.Component {
  render() {
    const tasks = this.props.tasks;
    if (tasks.length === 0) { return (<div />); }

    return (
      <div>
        {tasks.map(task => 
          <Task 
            sprint_id={this.props.sprint_id} 
            reload={this.props.reload} 
            key={`task:${task.id}`} 
            task={task}
            getNewSelectedProfile={this.props.getNewSelectedProfile} />)}
      </div>
    );
  }
}

export default Tasks;
