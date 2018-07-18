import React from "react";
import { Link } from "react-router-dom";
import { StatusCode } from "../../../lib/shared";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {COLOR} from "../../../lib/shared";
import EditBlockerForm from './EditBlockerForm.jsx';
console.log(COLOR.red);
class Blocker extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 'blocker': props.blocker, editing: false }
  }

  componentWillReceiveProps({ blocker }) {
    this.setState({ blocker });
  }

  handleDoubleClick(e) {
    this.setState({editing: !this.state.editing});
  }

  closeBlocker() {
    this.setBlocker({ editing: false })
  }

  render() {
    const blocker = this.state.blocker;
    const style = {borderRadius:'10px',margin:'5px',backgroundColor:COLOR.red}

    if (this.state.editing) {
      return <div>
          <Card onDoubleClick={this.handleDoubleClick} style={style}>
            <EditBlockerForm reload={this.reload} closeBlocker={this.closeBlocker} blocker={this.state.blocker} />
          </Card>
        </div>;
    }

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