import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Blockers from './Blockers.jsx';
import { StatusCode, PRIORITY_COLOR } from '../../../lib/shared';



class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: props.task, shadow: 1, editing: false };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentWillReceiveProps({ task }) {
    this.setState({ task });
  }

  onMouseOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ shadow: 3 });
  }

  onMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ shadow: 1 });
  }

  handleDoubleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ editing: !this.state.editing });
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
          <Card
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onDoubleClick={this.handleDoubleClick}
            style={style}
          >
            <AddTaskForm task={this.state.task} />
          </Card>
        </div>
      );
    }

    return (
      <div>
        <Card onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onDoubleClick={this.handleDoubleClick} style={style}>
          <Button variant="fab" aria-label="Add" style={addButtonStyle}>
      <AddIcon />
    </Button>
        </Card>
      </div>
    );
  }
}

export default AddTaskButton;
