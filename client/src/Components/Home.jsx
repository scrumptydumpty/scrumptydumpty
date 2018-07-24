import React from "react";

const Home = ({ user }) => {
  let splashStyle = {
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
        <span style={{ color: "grey" }}> {user.username}</span>.
        <br />
        Select a sprint from the dropdown to get started.
      </div>
    );
  }
  return (
    <div style={splashStyle}>Login to view your sprints</div>
  )
};

export default Home;
