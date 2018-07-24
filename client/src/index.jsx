import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Sprint from "./Components/Sprint.jsx";
import Home from './Components/Home.jsx';
import api from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sprint_id: false
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    api.verify().then(user => {
      console.log("verify response", user);
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <Router>
        <div style={{ fontFamily: "Roboto" }}>
          <Navbar user={this.state.user} />
          <hr style={{ marginBottom: "3.5em" }} />
          <Route exact path="/" render={() => <Home user={this.state.user}/>} />
          <Route
            path="/login"
            render={({ history }) => (
              <Login history={history} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/register"
            render={({ history }) => (
              <Register history={history} updateUser={this.updateUser} />
            )}
          />
          <Route path="/sprint/:id" component={Sprint} />
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById("app"));
