import React from "react";
import { Link } from "react-router-dom";
const api = require("../api");

class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username
    const password = this.state.password
    console.log(username, password);
    api.login(username, password)
      .then((res) =>{
        if(!res){
          const emsg = document.getElementById('loginformmessage');
          emsg.innerHTML = 'Invalid Credentials';
          setTimeout(() => {
            emsg.innerHTML = '';
          }, 2000);
          return;
        }
        console.log('login successful!')
       
      })
      



  }



  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value })
  }




  render() {
    return (<div>
      <form id="loginform" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <input type="submit" />
      </form>
      <div id="loginformmessage"></div>
    </div>
    );
  }
}

export default Login;