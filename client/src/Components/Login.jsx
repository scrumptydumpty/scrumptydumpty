import React from "react";
import { Link } from "react-router-dom";
const api = require("../api");
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = { username: '', password: '',errormessage:'' };
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
          console.log('invalid credentials')
            this.setState({errormessage:'Invalid Credentials'});
          setTimeout(() => {
              this.setState({ errormessage: '' });
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
    console.log(this.state)
      return <div style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
              
          <div>
                  <TextField required id="username" label="Username" defaultValue={this.state.username} margin="normal" onChange={this.handleUsernameChange} />  
          </div><div>
            <TextField required type="password" id="password" label="Password" defaultValue={this.state.password} margin="normal" onChange={this.handlePasswordChange} />
              </div><div id="loginformmessage" style={{ height: '20px' }}>{this.state.errormessage} </div>
              <div>
            <Button type="submit">Login</Button>
          </div>
        </form>
        
       
      </div>;
  }
}

export default Login;