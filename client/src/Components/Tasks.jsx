import React from 'react';
import Task from './Task.jsx';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: props.tasks };
    this.reload = props.reload;
    this.sprint_id = props.sprint_id 
    console.log('sprint id',this.sprint_id)
    
  }

  componentWillReceiveProps({ tasks }) {
    this.setState({ tasks });
  }

  render() {
    const tasks = this.state.tasks;
    if (tasks.length === 0) { return (<div />); }

    return (
      <div>
        {tasks.map(task => <Task sprint_id={this.sprint_id} reload={this.reload} key={`task:${task.id}`} task={task} />)}
      </div>
    );
  }
}

export default Tasks;
