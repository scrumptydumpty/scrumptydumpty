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
      open: false
    };
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handlePwSubmit = this.handlePwSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      currentPassword,
      newDescription,
      newPassword,
    } = this.state;

    if (this.uploadInput) {
      const fileData = new FormData();
      fileData.append('username', this.props.user.username);
      fileData.append('file', this.uploadInput.files[0]);  
      axios.post(
        '/users/pic', // Axios URL
        fileData, // Axios data object, must be FormData object from above
        { headers: { 'Content-Type': 'multipart/form-data' } }); // Axios config object
    }

    // api.updateUser(currentPassword, newPassword, newDescription).then((res) => {
    //   if (!res) {
    //   // fire error snackbar
    //   } else {
    //     this.setState({ currentPassword: '', newPassword: '' });
    //     // fire success snackbar
    //     // setTimeout(() => {
    //     //   this.props.history.push('/');
    //     // }, 1500);
    //   }
    // });
  }

  handleFieldUpdate(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleDialogOpen(e) {
    this.setState({ open: true });
  }

  handleDialogClose(e) {
    this.setState({ open: false });
  }

  handlePwSubmit(e) {
    e.preventDefault();
    const {
      currentPassword,
      newPassword,
    } = this.state;

    api.updateUserPassword(currentPassword, newPassword, this.props.user.username).then((res) => {
      this.setState({ currentPassword: '', newPassword: '' });
      this.handleDialogClose();
    });
  }

  render() {
    const { classes, user } = this.props;
    const { currentPassword, newUsername, newDescription, newPassword } = this.state;
    const submitDisabled = (newPassword === '') && (newDescription === '');
    //const submitDisabled = (newPassword === '') && (newDescription === '') && (this.uploadInput !== undefined);

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
            <hr style={hrStyle}/>
            <Typography variant="subheading">
              Account Details
            </Typography>
            <hr style={hrStyle} />
            <form onSubmit={this.handleSubmit}>
              <div style={rowStyle}>
                <span style={labelStyle}>Username</span>
                <span>
                  <TextField
                    id="newUsername"
                    placeholder={user.username}
                    value={newUsername}
                    margin="normal"
                    onChange={this.handleFieldUpdate}
                  />
                </span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Profile Picture</span>
                <span>
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </span>
              </div>
            </form>
            <div style={rowStyle}>
              <span style={labelStyle}>Password</span>
              <span>
                <Button onClick={this.handleDialogOpen}>EDIT</Button>
              </span>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" disabled={submitDisabled} color="primary" type="submit" className={classes.button}>
              <SaveIcon className={classes.leftIcon} />
                Save Changes
            </Button>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit username</DialogTitle>
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
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePwSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
          </Dialog>
        
          {/* <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" gutterBottom>
                Welcome, {user.username}!
          </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                required
                type="password"
                id="currentPassword"
                label="Current Password"
                value={currentPassword}
                margin="normal"
                onChange={this.handleFieldUpdate}
              />
              <Tooltip title="We require your current password to make any changes to your profile because we're SUPER SECURE!">
                <HelpIcon />
              </Tooltip>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                required
                type="password"
                id="newPassword"
                label="New Password"
                value={newPassword}
                margin="normal"
                onChange={this.handleFieldUpdate}
              />
              <TextField
                id="newDescription"
                label="New Description"
                multiline
                placeholder={user.description}
                value={newDescription}
                margin="normal"
                onChange={this.handleFieldUpdate}
              />
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </CardContent>
          </Card> */}
      </div>
    );
  }
}

export default withStyles(styles)(UpdateUserForm);
