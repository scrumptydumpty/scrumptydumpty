import React from 'react';
import Task from './Task.jsx';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sprint_id:props.sprint_id, tasks: props.tasks };
    this.reload = props.reload;

  }

  componentWillReceiveProps({sprint_id, tasks}){
    this.setState({ sprint_id, tasks })
  }



  render() {
    const tasks = this.state.tasks;
    if (tasks.length === 0) { return (<div />); }

    return (
      <div>
        {tasks.map(task => <Task sprint_id={this.sprint_id} reload={this.state.reload} key={`task:${task.id}`} task={task} />)}
      </div>
    );
  }
}

export default Tasks;
