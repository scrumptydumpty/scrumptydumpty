import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const api = require('../api');

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newpassword: '',
      errormessage: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, newpassword } = this.state;

    api.updateUser(password, newpassword, this.props.user.username).then((res) => {
      if (!res) {
        this.setState({ errormessage: 'Password Incorrect' });
        setTimeout(() => {
          this.setState({ errormessage: '' });
        }, 2000);
      } else {
        this.setState({ errormessage: 'Password Updated', password: '', newpassword: '' });
        setTimeout(() => {
          this.setState({ errormessage: '' });
          this.props.history.push('/');
        }, 2000);
      }
    });
  }


  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  handleNewPasswordChange(e) {
    e.preventDefault();
    this.setState({ newpassword: e.target.value });
  }

  render() {
    let formBottom = (
      <div>
        <Button type="submit">
        Change Password
        </Button>
      </div>
    );

    if (this.state.errormessage !== '') {
      formBottom = (
        <div id="registerformmessage" style={{ height: '20px' }}>
          {this.state.errormessage}
          {' '}
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              required
              type="password"
              id="password"
              label="Old Password"
              value={this.state.password}
              margin="normal"
              onChange={this.handlePasswordChange}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              id="newpassword"
              label="New Password"
              value={this.state.newpassword}
              margin="normal"
              onChange={this.handleNewPasswordChange}
            />
          </div>
          {formBottom}
        </form>
      </div>
    );
  }
}

export default UpdateUserForm;
