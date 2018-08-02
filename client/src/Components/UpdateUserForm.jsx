import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const api = require('../api');

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
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
      newPassword: '',
      newUsername: '',
      newDescription: '',
    };
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentPassword, newDescription, newPassword } = this.state;
    const { user } = this.props;

    api.updateUser(currentPassword, newPassword, newDescription, user.username).then((res) => {
      if (!res) {
      // fire error snackbar
      } else {
        this.setState({ currentPassword: '', newPassword: '' });
        // fire success snackbar
        setTimeout(() => {
          this.props.history.push('/');
        }, 2000);
      }
    });
  }

  handleFieldUpdate(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    const { classes } = this.props;
    const { currentPassword, newDescription, newPassword } = this.state;
    const submitDisabled = (newPassword === '') && (newDescription === '');

    return (
      <form onSubmit={this.handleSubmit}>
        <Typography variant="subheading" gutterBottom>
          DB Username: {this.props.user.username}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          DB Description: {this.props.user.description}
        </Typography>
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
              label="Description"
              multiline
              value={newDescription}
              margin="normal"
              onChange={this.handleFieldUpdate}
            />
          </CardContent>
        </Card>
        <Button variant="contained" disabled={submitDisabled} color="primary" type="submit" className={classes.button}>
          <SaveIcon className={classes.leftIcon} />
          Save Changes
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UpdateUserForm);
