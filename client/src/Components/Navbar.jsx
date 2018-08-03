import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import api from '../api';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      accountEl: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const { user, logout, sprintList } = this.props;
    const { anchorEl, accountEl } = this.state;
    return (
      <AppBar style={{ backgroundColor: '#ed1a5c' }}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            style={{
              marginLeft: 50,
              marginRight: 50,
              fontSize: '1.75em'
            }}
            component={Link}
            to="/"
          >
            Scrumpalicious.
          </Typography>
          {user === null ? (
            <div>
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                label="register"
                to="/register"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                aria-owns={accountEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                to={"/updateuser"}
                label="account"
              >
                My Profile
                <i className="fa fa-user-circle" style={{marginLeft: '8px'}} aria-hidden="true"></i>
              </Button>
              {/* <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                href="/graphql"
                label="graphql"
              >
                GraphQL
              </Button> */}
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                component={Link}
                to={"/logout"}
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
