import React from "react";
import { Link } from "react-router-dom";
import { StatusCode } from "../../../lib/shared";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import COLOR from "../../../lib/shared";

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
    const style = {'textColor':COLOR.red}
    return (
      <div>
        <Card>
        <CardContent>
        <div style={style}>{blocker.title}</div>
        <div>Status: {Object.keys(StatusCode).find(x => StatusCode[x] === blocker.status_code)}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Blocker;