import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const api = require('../api');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errormessage: '' };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = props.updateUser;
    this.history = props.history;
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    api.login(username, password)
      .then((res) => {
        if (!res) {
          this.setState({ errormessage: 'Invalid Credentials' });
          setTimeout(() => {
            this.setState({ errormessage: '' });
          }, 2000);
          return;
        }
        this.updateUser();
        this.history.push('/');
      });
  }


  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }


  render() {
    return (
      <div style={{ textAlign: 'center', height: '600px', width: '400px', border: '1px solid red'}}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField required id="username" label="Username" value={this.state.username} margin="normal" onChange={this.handleUsernameChange} />
          </div>
          <div>
            <TextField required type="password" id="password" label="Password" value={this.state.password} margin="normal" onChange={this.handlePasswordChange} />
          </div>
          <div id="loginformmessage" style={{ height: '20px' }}>
            {this.state.errormessage}
            {' '}
          </div>
          <div>
            <Button type="submit">
              Login
            </Button>
          </div>
        </form>


      </div>
    );
  }
}

export default Login;
