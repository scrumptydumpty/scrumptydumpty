import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Blockers from './Blockers.jsx';
import { StatusCode, PRIORITY_COLOR } from '../../../lib/shared';
import EditTaskForm from './EditTaskForm.jsx';


const TaskInfo = ({ task, reload }) => (
  <div>
    <CardContent style={{ padding: '5px', textAlign: 'center' }}>
      <div>
        {task.title}
      </div>
      <div>
Status:
        {' '}
        {Object.keys(StatusCode).find(x => StatusCode[x] === task.status_code)}
      </div>
      <div>
Blockers:
        {' '}
        <Blockers reload={reload} blockers={task.blockers} />
      </div>
    </CardContent>

  </div>
);

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: props.task, shadow: 1, editing: false };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.reload = props.reload;
    this.sprint_id = props.sprint_id;
    this.closeTask = this.closeTask.bind(this);
  }

  closeTask() {
    this.setState({ editing: false });
  }

  componentWillReceiveProps({ task }) {
    this.setState({ task });
  }

  onMouseOver(e) {
    console.log('Task Over');
    this.setState({ shadow: 3 });
  }

  onMouseOut(e) {
    console.log('Task Out');
    this.setState({ shadow: 1 });
  }

  handleDoubleClick(e) {
    this.setState({ editing: !this.state.editing }, () => this.reload());
  }


  render() {
    const { task } = this.state;
    const borderColor = PRIORITY_COLOR[task.priority_code];

    const style = {
      borderRadius: '10px',
      margin: '10px',
      borderLeft: '2px solid',
      borderLeftColor: borderColor,

    };
    if (this.state.shadow === 3) {
      style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    }

    if (this.state.editing) {
      return (
        <div>
          <Card onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onDoubleClick={this.handleDoubleClick} style={style}>
            <EditTaskForm sprint_id={this.sprint_id}  reload={this.reload} closeTask={this.closeTask} task={this.state.task} />
          </Card>
        </div>
      );
    }

    return (
      <div>
        <Card
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onDoubleClick={this.handleDoubleClick}
          style={style}
        >
          <TaskInfo task={this.state.task} reload={this.reload} />
        </Card>
      </div>
    );
  }
}

export default Task;
