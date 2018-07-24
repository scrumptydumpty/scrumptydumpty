import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import api from "../api";
import Menu from "@material-ui/core/Menu";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { throws } from "assert";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintList: [],
      sprint: ''
    };
    this.updateSprintList = this.updateSprintList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.updateSprintList();
    }
  }

  updateSprintList() {
    api.getSprints().then(sprintList => {
      this.setState({ sprintList });
    });
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state)
  };

  render() {
    const { user } = this.props;
    const { sprintList } = this.state;
    return (
      <AppBar color="default">
        {user === null ? (
          <Tabs>
            <Tab component={Link} textColor="primary" label="Scrumpty" to="/" />
            <Tab component={Link} to="/register" label="Register" />
            <Tab
              component={Link}
              to="/login"
              label="Login"
              href="#basic-tabs"
            />
          </Tabs>
        ) : (
          <Tabs>
            <Tab component={Link} textColor="primary" label="Scrumpty" to="/" />
            <FormControl >
              <InputLabel htmlFor="age-simple">Sprints</InputLabel>
              <Select
                value={this.state.sprint}
                onChange={this.handleChange}
                inputProps={{
                  name: "sprint",
                  id: "sprint-select"
                }}
              >
                {this.state.sprintList.map(sprint => (
                  <MenuItem
                  value={sprint.id}
                  component={Link}
                  label={sprint.title}
                  to={`/sprint/${sprint.id}`}
                  >
                  {sprint.title}
                  </MenuItem>
                ))}
                
              </Select>
            </FormControl>
            <Tab
              component={Link}
              to="/logout"
              label="Logout"
              href="#basic-tabs"
            />
          </Tabs>
        )}
      </AppBar>
    );
  }
}

export default Navbar;
