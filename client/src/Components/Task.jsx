import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Blockers from './Blockers.jsx';
import { PRIORITY_COLOR } from '../../../lib/shared';
import EditTaskForm from './EditTaskForm.jsx';
import DeleteIcon from '@material-ui/icons/Delete';
import Eyeball from '@material-ui/icons/Visibility';
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, editing: false };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.closeTask = this.closeTask.bind(this);
  }

  closeTask() {
    this.setState({ editing: false });
  }

  onMouseOver(e) {
    this.setState({ active: true });
  }

  onMouseOut(e) {
    this.setState({ active: false });
  }

  viewProfile(e) {
    // this.setState({ editing: !this.state.editing }, () => {
    //   let user = {
    //     description: this.props.task.description,
    //     id: this.props.task["user_id"],
    //     username: this.props.task.title
    //   }
    //   this.props.reload();
    //   this.props.getNewSelectedProfile(user);
    // });
    let user = {
      description: this.props.task.description,
      id: this.props.task["user_id"],
      username: this.props.task.title
    }
    this.props.getNewSelectedProfile(user);
  }


  render() {
    const borderColor = PRIORITY_COLOR[this.props.task.priority_code];

    const style = {
      backgroundColor: "#fff",
      borderRadius: 3,
      boxShadow: "0 1px 0 #ccc",
      display: "block",
      marginBottom: 8,
      maxWidth: 300,
      minHeight: 20,
      position: "relative",
      textDecoration: "none",
      borderLeft: '8px solid',
      borderLeftColor: borderColor
    };
    
    if (this.state.active === true) {
      style.backgroundColor = "#edeff0";
      style.borderBottomColor = "#d6dadc";
    }

    // if (this.state.editing) {
    //   return (
    //     <div>
    //       <Card 
    //         onMouseOver={this.onMouseOver} 
    //         onMouseOut={this.onMouseOut} 
    //         onClick={this.handleClick}
    //         style={style}>
    //         <EditTaskForm sprint_id={this.props.sprint_id} reload={this.props.reload} closeTask={this.closeTask} task={this.props.task} />
    //       </Card>
    //     </div>
    //   );
    // }

    return (
      <div onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>
        <Card onClick={this.viewProfile} style={style}>
          <CardContent style={{ padding: '5px' }}>
            <div>
              <span style={{ paddingLeft: '10px' }}>{this.props.task.title}</span>
              {this.state.active ? 
                <span><Eyeball
                  style={{ fontSize: "1.2em", float: "right", paddingRight: "5px" }}
                  /></span> : null}
            </div>
            <div>
              <Blockers reload={this.props.reload} blockers={this.props.task.blockers} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Task;
