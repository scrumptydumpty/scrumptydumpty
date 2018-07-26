import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import api from "../api";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintList: [],
      sprint: "",
      anchorEl: null
    };
    this.updateSprintList = this.updateSprintList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { user, logout } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            style={{
              marginLeft: 0,
              marginRight: 30
            }}
            component={Link}
            to={"/"}
          >
            Scrumpty.
          </Typography>
          {user === null ? (
            <div>
              <Button
                color="inherit"
                aria-owns={anchorEl ? "simple-menu" : null}
                aria-haspopup="true"
                component={Link}
                label="login"
                to={"/login"}
              >
                Log In
              </Button>
              <Button
                color="inherit"
                aria-owns={anchorEl ? "simple-menu" : null}
                aria-haspopup="true"
                component={Link}
                label="register"
                to={"/register"}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                aria-owns={anchorEl ? "simple-menu" : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                label="sprints"
              >
                Your Sprints
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {this.state.sprintList && this.state.sprintList.map(sprint => (
                  <MenuItem
                    key={sprint.id}
                    onClick={this.handleClose}
                    value={sprint.id}
                    component={Link}
                    label={sprint.title}
                    to={`/sprint/${sprint.id}`}
                  >
                    {sprint.title}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                color="inherit"
                aria-owns={anchorEl ? "simple-menu" : null}
                aria-haspopup="true"
                onClick={logout}
                label="logout"
              >
                Log Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
