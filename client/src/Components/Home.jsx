import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const splashStyle = {
    maxWidth: "300",
    fontSize: "2em",
    fontWeight: "lighter",
    margin: "4em auto",
    textAlign: "center"
  };
  if (user) {
    return (
      <div style={splashStyle}>
        Welcome,
        <span style={{ color: "grey" }}> {user.username}</span>
        .
        <br />
        <Link to="/addsprint">Create a new sprint</Link>
        , or view a sprint from the dropdown at the top of the screen.
      </div>
    );
  }
  return (
    <div style={splashStyle}>
      Welcome to Scrumpty! Login to view your sprints.
    </div>
  );
};

export default Home;
