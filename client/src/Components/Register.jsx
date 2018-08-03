import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from './scrumlords.png';
import { Redirect } from 'react-router-dom';
const api = require('../api');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      description: '',
      errormessage: ''
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = props.updateUser;
    this.history = props.history;
    this.addSprint = api.addSprint.bind(this);
    this.setSprint = props.setSprint;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, description } = this.state;

    api.addUser(username, password, description).then((res) => {
      if (!res) {
        this.setState({ errormessage: 'User Already Exists' });
        setTimeout(() => {
          this.setState({ errormessage: '' });
        }, 2000);
        return;
      }
      this.updateUser();
      this.addSprint(this.state.username).then((res) => {
        let sprint = `/sprint/${res.id}`
        this.history.push(sprint)
      })
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

  handleDescriptionChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }


  render() {
    return (
      <div style={{
        margin: 'auto',
        marginTop: '10%',
        textAlign: 'center',
        minHeight: '600px',
        width: '400px',
        border: '1px solid red'
      }}>
        <img src={logo} style={{ width: '100%', padding: '50px 0', maxHeight: 300 }} />
        <form onSubmit={this.handleSubmit}>
          <Typography variant="headline" component="h4" align="center" gutterBottom={true}>
            Let's get scrumpty
          </Typography>
          <div>
            <TextField required id="username" label="Username" value={this.state.username}
              margin="normal" onChange={this.handleUsernameChange}
              style={{ width: "85%" }} />
          </div>
          <div>
            <TextField required type="password" id="password" label="Password"
              value={this.state.password} margin="normal" onChange={this.handlePasswordChange}
              style={{ width: "85%" }} />
          </div>
          <div>
            <TextField required multiline rowsMax="7" id="description"
              label="Description" value={this.state.description} margin="normal"
              onChange={this.handleDescriptionChange}
              style={{ width: "85%" }} />
          </div>
          <div id="registerformmessage" style={{ height: '20px' }}>
            {this.state.errormessage}
            {' '}
          </div>
          <div style={{ marginBottom: 30 }}>
            <Button type="submit">
              Register
            </Button>
          </div>
        </form>


      </div>
    );
  }
}

export default Register;
