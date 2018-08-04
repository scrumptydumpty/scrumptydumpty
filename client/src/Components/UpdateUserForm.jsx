import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/HelpOutline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { CardActions } from '../../../node_modules/@material-ui/core';
const axios = require('axios');
const api = require('../api');

const styles = {
  card: {
    minWidth: 275,
    width: "100%",
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
  leftIcon: {
    marginRight: '6px',
  },
};

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newUsername: '',
      newPassword: '',
      newDescription: '',
      nameOpen: false,
      nameClose: false,
      descOpen: false,
      descClose: false,
      pwOpen: false,
      picOpen: false
    };
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);

    this.handleNameOpen = this.handleNameOpen.bind(this);
    this.handleNameClose = this.handleNameClose.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);

    this.handleDescOpen = this.handleDescOpen.bind(this);
    this.handleDescClose = this.handleDescClose.bind(this);
    this.handleDescSubmit = this.handleDescSubmit.bind(this);

    this.handlePicOpen = this.handlePicOpen.bind(this);
    this.handlePicClose = this.handlePicClose.bind(this);
    this.handlePicSubmit = this.handlePicSubmit.bind(this);

    this.handlePwOpen = this.handlePwOpen.bind(this);
    this.handlePwClose = this.handlePwClose.bind(this);
    this.handlePwSubmit = this.handlePwSubmit.bind(this);    
  }

  handleFieldUpdate(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleNameOpen(e) {
    this.setState({ nameOpen: true });
  }

  handleNameClose(e) {
    this.setState({ nameOpen: false });
  }

  handleNameSubmit(e) {
    e.preventDefault();
    api.updateUserName(this.state.newUsername, this.props.user.username)
      .then((res) => {
        this.props.updateUser();
        this.handleNameClose();
      })
  }

  handleDescOpen(e) {
    this.setState({ descOpen: true });
  }

  handleDescClose(e) {
    this.setState({ descOpen: false });
  }

  handleDescSubmit(e) {
    e.preventDefault();
    api.updateUserDesc(this.state.newDescription, this.props.user.username)
      .then((res) => {
        this.props.updateUser();
        this.handleDescClose();
      })
  }

  handlePicOpen(e) {
    this.setState({ picOpen: true });
  }

  handlePicClose(e) {
    this.setState({ picOpen: false });
  }

  handlePicSubmit(e) {
    if (this.uploadInput) {
      const fileData = new FormData();
      fileData.append('username', this.props.user.username);
      fileData.append('file', this.uploadInput.files[0]);
      axios.post(
        '/users/pic', // Axios URL
        fileData, // Axios data object, must be FormData object from above
        { headers: { 'Content-Type': 'multipart/form-data' } }); // Axios config object
    }
  }

  handlePwOpen(e) {
    this.setState({ pwOpen: true });
  }

  handlePwClose(e) {
    this.setState({ pwOpen: false });
  }

  handlePwSubmit(e) {
    e.preventDefault();
    const {
      currentPassword,
      newPassword,
    } = this.state;

    api.updateUserPassword(currentPassword, newPassword, this.props.user.username)
      .then((res) => {
        this.setState({ currentPassword: '', newPassword: '' });
        this.props.updateUser();
        this.handlePwClose();
      });
  }

  render() {
    const { classes, user } = this.props;
    const { currentPassword, newUsername, newDescription, newPassword } = this.state;

    const hrStyle = {
      border: 0,
      height: 0,
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
    }

    const rowStyle = {
      alignItems: "center",
      display: "flex",
    }

    const labelStyle = {
      flexGrow: 1,
      marginTop: "10px"
    }

    return (
      <div style={{ margin: 'auto', marginTop: '10%', height: '600px', width: '400px' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" gutterBottom={true}>
              Welcome, {user.username}!
              </Typography>
            <hr style={hrStyle} />
            <Typography variant="subheading">
              Account Settings
            </Typography>
            <hr style={hrStyle} />
            <div style={rowStyle}>
              <span style={labelStyle}>Username</span>
              <span>
                <Button onClick={this.handleNameOpen}>EDIT</Button>
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Password</span>
              <span>
                <Button onClick={this.handlePwOpen}>EDIT</Button>
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Description</span>
              <span>
                <Button onClick={this.handleDescOpen}>EDIT</Button>
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Profile Picture</span>
              <span>
                <Button onClick={this.handlePicOpen}>EDIT</Button>
              </span>
            </div>
          </CardContent>
        </Card>
        <Dialog
          open={this.state.nameOpen}
          onClose={this.handleNameClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change username</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <TextField
                  id="newUsername"
                  placeholder={user.username}
                  value={newUsername}
                  margin="normal"
                  onChange={this.handleFieldUpdate}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleNameClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleNameSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.descOpen}
          onClose={this.handleDescClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change description</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <TextField
                  multiline rowsMax="7"
                  id="newDescription" margin="normal"
                  placeholder={user.description}
                  value={newDescription}
                  onChange={this.handleFieldUpdate}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDescClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDescSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.pwOpen}
          onClose={this.handlePwClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change password</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <TextField
                  required
                  type="password"
                  id="currentPassword"
                  label="Current Password"
                  value={currentPassword}
                  margin="normal"
                  onChange={this.handleFieldUpdate}
                />
                <TextField
                  required
                  type="password"
                  id="newPassword"
                  label="New Password"
                  value={newPassword}
                  margin="normal"
                  onChange={this.handleFieldUpdate}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePwClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePwSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.picOpen}
          onClose={this.handlePicClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change profile picture</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePicClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePicSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(UpdateUserForm);
