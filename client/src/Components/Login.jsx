import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from './scrumlords.png';
const api = require('../api');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errormessage: '' };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = props.updateUser;
    this.history = this.props.history;
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
        
    })
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
      <div style={{ margin: 'auto', marginTop: '10%', textAlign: 'center', height: '600px', width: '400px', border: '1px solid red'}}>
        <img src={logo} style={{width: '100%', padding: '50px 0'}} />
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField required id="username" label="Username" 
              value={this.state.username} margin="normal" 
              onChange={this.handleUsernameChange}
              style={{ width: "85%" }} />
          </div>
          <div>
            <TextField required type="password" id="password" 
              label="Password" value={this.state.password} margin="normal" 
              onChange={this.handlePasswordChange}
              style={{ width: "85%" }} />
          </div>
          <div id="loginformmessage" style={{ height: '20px' }}>
            {this.state.errormessage}
            {' '}
          </div>
          <div>
            <Button type="submit"
              style={{
                fontFamily: "Helvetica,sans-serif",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                display: "inline-block",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background-color .3s,border-color .3s",
                backgroundColor: "rgb(237, 26, 92)",
                padding: "10px",
                marginBottom: "10px"
              }}>
              Login With Username
            </Button>
          </div>
          <div>
            <a href="/auth/facebook" style={{
              fontFamily: "Helvetica,sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
              cursor: "pointer",
              display: "inline-block",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "background-color .3s,border-color .3s",
              backgroundColor: "#4c69ba",
              padding: "10px",
            }}>Login with Facebook</a>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
