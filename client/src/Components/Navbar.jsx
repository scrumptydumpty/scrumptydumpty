import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Navbar = ({ user }) => {
  return (
    <AppBar color="default">
      {user === null ? (
        <Tabs>
          <Tab component={Link} textColor="primary" label="Scrumpty" to="/" />
          <Tab component={Link} to="/register" label="Register" />
          <Tab component={Link} to="/login" label="Login" href="#basic-tabs" />
        </Tabs>
      ) : (
        <Tabs>
          <Tab component={Link} textColor="primary" label="Scrumpty" to="/" />
          <Tab component={Link} to="/sprints" label="Your Sprints"> />
          </Tab>
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
};

export default Navbar;
