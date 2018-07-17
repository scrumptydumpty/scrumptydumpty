import React from "react";
import { Link } from "react-router-dom";
import { StatusCode } from "../../../lib/shared";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {COLOR} from "../../../lib/shared";
console.log(COLOR.red);
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
    const style = {borderRadius:'10px',margin:'5px',backgroundColor:COLOR.red}
    return (
      <div>
        <Card style={style}>
        <CardContent style={{padding:'5px', textAlign:'center'}}>
        <div >{blocker.title}</div>
        <div>Status: {Object.keys(StatusCode).find(x => StatusCode[x] === blocker.status_code)}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Blocker;