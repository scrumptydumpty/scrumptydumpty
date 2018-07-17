import React from "react";
import { Link } from "react-router-dom";
import { StatusCode } from "../../../lib/shared";

class Blocker extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 'blocker': props.blocker }
  }

  componentWillReceiveProps({ blocker }) {
    this.setState({ blocker });
  }

  render() {
    const blocker = this.state.blocker;
    return (
      <div>
        <div>Title: {blocker.title}</div>
        <div>Description: {blocker.description}</div>
        <div>Status: {Object.keys(StatusCode).find(x => StatusCode[x] === blocker.status_code)}</div>
      </div>
    );
  }
}

export default Blocker;