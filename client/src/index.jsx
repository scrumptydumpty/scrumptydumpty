import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Sprint from "./Components/Sprint.jsx";
import Home from "./Components/Home.jsx";
import AddSprint from "./Components/AddSprint.jsx";
import api from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sprint_id: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.forceSprintListUpdate = this.forceSprintListUpdate.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.state.user) {
      this.updateUser();
    }
  }

  logout() {
    api.logout().then(res => {
      if (res) {
        this.setState({ user: null });
      }
    });
  }

  forceSprintListUpdate() {
    return new Promise((res, rej) => {
      this.setState({ user: null }, () => this.updateUser().then(() => res()));
    });
  }

  updateUser() {
    return new Promise((res, rej) => {
      api.verify().then(user => {
        if (user) {
          this.setState({ user });
        }
        res();
      });
    });
  }

  render() {
    return (
      <Router>
        <div style={{ fontFamily: "Roboto" }}>
          <Navbar user={this.state.user} logout={this.logout} />
          <hr style={{ marginBottom: "3.5em" }} />
          <Route
            exact
            path="/"
            render={() => <Home user={this.state.user} />}
          />
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
          <Route
            path="/addsprint"
            render={({ history }) => (
              <AddSprint
                history={history}
                forceSprintListUpdate={this.forceSprintListUpdate}
              />
            )}
          />
          <Route
            path="/sprint/:id"
            render={routeprops => (
              <Sprint user={this.state.user} {...routeprops} />
            )}
          />
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById("app"));
