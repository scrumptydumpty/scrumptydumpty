import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { StatusCode } from '../../../lib/shared';
import Tasks from './Tasks.jsx';
import SelectedProfile from './SelectedProfile.jsx';
import AddUserToSprintForm from './AddUserToSprintForm.jsx';
import Messenger from './Messaging.jsx';
import api from '../api';

class Sprint extends React.Component {
  constructor(props) {
    super(props);
    const sprint_id = +props.match.params.id || null;
    this.state = {
      sprint_id,
      isOwner: false,
      open: false,
      tasks: [],
      selectedProfile: '',
      noShows: []
    };
    this.updateNoShows();
    this.getNewSelectedProfile = this.getNewSelectedProfile.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reload = this.reload.bind(this);
    this.socket = props.socket;
    this.reject = this.reject.bind(this);
    this.updateNoShows = this.updateNoShows.bind(this);
    console.log(props)
    this.messenger = (<Messenger socket={this.socket} target={this.state.selectedProfile}/>)
  }

  componentDidMount () {
    this.reload();
  }

  updateNoShows() {
    const sprint_id = this.state.sprint_id;
    api
      .getNoShowList(sprint_id)
      .then((noShows) => {
        this.setState({ noShows });
      })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.id !== this.state.sprint_id) {
      this.setState({ sprint_id: nextProps.match.params.id }, () => this.reload() );
    }
  }

  getNewSelectedProfile(user) {
    this.setState({ selectedProfile: user });
  }

  handleClickOpen(e) {
    e.preventDefault();
    this.setState({
      open: true,
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

  reject(user_id) {
    const sprint_id = this.props.user.id;
    return api
      .rejectUser({ user_id, sprint_id })
      .then( res => {
        if (!res) {
          console.log('something went wrong');
        }
        const ids = [];
        res.forEach( noShow => {
          ids.push(noShow.user_id);
        })
        this.setState({ noShows: ids });
      })
      .catch(err => console.log(err));
  }

  reload() {
    api.getTasks(this.state.sprint_id).then((tasks) => {
      this.setState({ tasks });
    });

    api.isOwner(this.state.sprint_id).then((res) => {
      if (!res) {
        this.setState({ isOwner: false });
      } else {
        this.setState({ isOwner: true });
      }
    });
  }

  render() {
    const tasks = this.state.tasks;
    const notStarted = tasks.filter(
      x => x.status_code === StatusCode.NotStarted,
    );
    const inProgress = tasks.filter(
      x => x.status_code === StatusCode.InProgress,
    );
    const complete = tasks.filter(x => x.status_code === StatusCode.Complete);

    const paperStyle = {
      background: 'white',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
      position: 'relative',
      whiteSpace: 'normal',
    };

    const headerStyle = {
      fontFamily: 'Roboto',
      fontSize: '1.3em',
      fontColor: 'D3D3D3',
      width: '95%',
      height: '70%',
      padding: '3px',
      fontStyle: 'italic',
      margin: '1px auto',
    }

    let profile;
    let messenger;
    if (this.state.selectedProfile) {
      profile = (
        <SelectedProfile
          sprint_id={this.state.sprint_id}
          reload={this.reload}
          selectedProfile={this.state.selectedProfile}
          updateNoShows={this.updateNoShows}
          noShows={this.state.noShows}
        />
      );
      messenger = (
        <Messenger socket={this.socket} target={this.state.selectedProfile}/>
      )

    } else {
      profile = (
        <Card>
          <p style={{ textAlign: 'center' }}>
            Click on someone in your dating pool to view their profile
          </p>
        </Card>
      );

    }

    return (
      <div onClick={this.closeEdits}>
        <Drawer variant="permanent" anchor="right">
          <AddUserToSprintForm
            user={this.props.user}
            isOwner={this.state.isOwner}
            sprint_id={this.state.sprint_id}
            selectedProfile={this.state.selectedProfile}
            getNewSelectedProfile={this.getNewSelectedProfile}
            noShows={this.state.noShows || []}
            updateNoShows={this.updateNoShows}
            reject={this.reject}
          />
        </Drawer>
        <Grid
          style={{ padding: '1em', width: '85%' }}
          container
          spacing={24}
          justify="center"
        >
          <Grid item xs={3}>
            <Paper style={paperStyle}>
              <Typography style={headerStyle} variant="headline" component="h4" align="center" gutterBottom={true}>
                Selected Profile
              </Typography>
              {profile}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={paperStyle}>
              <Typography style={headerStyle} variant="headline" component="h4" align="center" gutterBottom={true}>
                To Do
              </Typography>
              <Tasks
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={notStarted}
                getNewSelectedProfile={this.getNewSelectedProfile}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={paperStyle}>
            <Typography style={headerStyle} variant="headline" component="h4" align="center" gutterBottom={true}>
                In Progress
              </Typography>
              <Tasks
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={inProgress}
                getNewSelectedProfile={this.getNewSelectedProfile}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={paperStyle}>
              <Typography style={headerStyle} variant="headline" component="h4" align="center" gutterBottom={true}>
                Completed
              </Typography>
              <Tasks
                sprint_id={this.state.sprint_id}
                reload={this.reload}
                tasks={complete}
                getNewSelectedProfile={this.getNewSelectedProfile}
              />
            </Paper>
          </Grid>
        </Grid>
          {messenger}
      </div>
    );
  }
}

export default Sprint;
