import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { StatusCode } from '../../../lib/shared';
import Tasks from './Tasks.jsx';
import api from '../api';
import AddTaskButton from './AddTaskButton.jsx';
import AddUserToSprintForm from './AddUserToSprintForm.jsx';

class Sprint extends React.Component {
  constructor(props) {
    super(props);
    const sprint_id = +props.match.params.id || null;
    console.log('loading sprint', sprint_id);
    this.state = {
      sprint_id, isOwner: false, open: false, tasks: [],
    };
    console.log(this.state);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.closeEdits = this.closeEdits.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentWillMount() {
    this.reload();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.id !== this.state.sprint_id) {
      this.setState({ sprint_id: nextProps.match.params.id }, () => this.reload());
    }
  }

  closeEdits(e) {
    // e.preventDefault();
    // console.log('click')

  }


  handleClickOpen(e) {
    e.preventDefault();
    this.setState({
      open: true,
    });
  }

  reload() {
    // console.log(this.state,'state of sprint')
    api.getTasks(this.state.sprint_id)
      .then((tasks) => { this.setState({ tasks }); });

    api.isOwner(this.state.sprint_id)
      .then((res) => {
        if (!res) {
          this.setState({ isOwner: false });
        } else {
          this.setState({ isOwner: true });
        }
      });
  }

  handleClose(shouldReload = false) {
    this.setState({
      open: false,
    });
    if (shouldReload) {
      this.reload();
    }
  }


  render() {
    // console.log('rendering id', this.state.sprint_id)
    // console.log(this.state)
    const tasks = this.state.tasks;
    const notStarted = tasks.filter(x => x.status_code === StatusCode.NotStarted);
    const inProgress = tasks.filter(x => x.status_code === StatusCode.InProgress);
    const complete = tasks.filter(x => x.status_code === StatusCode.Complete);

    let ownerMenu = <div />;
    if (this.state.isOwner) {
      ownerMenu = <AddUserToSprintForm sprint_id={this.state.sprint_id} />;
    }

    const addButtonStyle = {
      margin: 'auto',
      backgroundColor: 'white',
    };
    // console.log(notStarted,inProgress,complete)
    return (
      <div onClick={this.closeEdits}>
        <Paper>
          <Grid container spacing={24} justify="center">
            <Grid item xs={4}>
              <strong>Todo</strong>
              <Tasks sprint_id={this.state.sprint_id} reload={this.reload} tasks={notStarted} />
              <Grid container style={{ textAlign: 'center' }}>
                <AddTaskButton sprint_id={this.state.sprint_id} reload={this.reload} />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <strong>In Progress</strong>
              <Tasks sprint_id={this.state.sprint_id} reload={this.reload} tasks={inProgress} />
            </Grid>
            <Grid item xs={4}>
              <strong>Completed</strong>
              <Tasks sprint_id={this.state.sprint_id} reload={this.reload} tasks={complete} />
            </Grid>
          </Grid>
        </Paper>
        {ownerMenu}
      </div>
    );
  }
}

export default Sprint;
