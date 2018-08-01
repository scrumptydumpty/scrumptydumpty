import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from './api';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
import Logout from './Components/Logout.jsx';
import Register from './Components/Register.jsx';
import Sprint from './Components/Sprint.jsx';
import Home from './Components/Home.jsx';
import AddSprint from './Components/AddSprint.jsx';
import UpdateUserForm from './Components/UpdateUserForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sprintList: [],
      sprint_id: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.updateSprintList = this.updateSprintList.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Any time app re-renders, check for user session
    this.updateUser();
  }

  updateSprintList() {
    // Fetch sprints for user
    return api.getSprints().then((sprintList) => {
      this.setState({ sprintList });
    });
  }

  logout() {
    // Destroy user session
    api.logout().then((res) => {
      if (res) {
        this.setState({ user: null, sprintList: [] });
      }
    });
  }

  updateUser() {
    // Check for user credentials, then fetch sprints for user
    api.verify().then((user) => {
      if (user) {
        this.setState({ user });
        this.updateSprintList();
      }
    });
  }

  render() {
    const { user, sprintList } = this.state;
    return (
      <Router>
        <div style={{ fontFamily: 'Roboto' }}>
          <Navbar
            user={user}
            logout={this.logout}
            sprintList={sprintList}
          />
          <hr style={{ marginBottom: '3.5em' }} />
          <Route
            exact
            path="/"
            render={() => <Home user={user} />}
          />
          <Route
            path="/login"
            render={({ history }) => (
              <Login history={history} updateUser={this.updateUser} />
            )}
          />
          <Route
            path="/logout"
            render={({ history }) => (
              <Logout history={history} logout={this.logout} />
            )}
          />
          <Route
            path="/updateuser"
            render={({ history }) => (
              <UpdateUserForm history={history} user={user} />
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
                updateSprintList={this.updateSprintList}
              />
            )}
          />
          <Route
            path="/sprint/:id"
            render={routeprops => (
              <Sprint user={user} {...routeprops} />
            )}
          />
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById("app"));
