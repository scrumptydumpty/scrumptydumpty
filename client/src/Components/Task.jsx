import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Blockers from "./Blockers.jsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Task extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {'task':props.task}
  }

  componentWillReceiveProps({task}){
    this.setState({task});
  }
  
  render(){
    const task = this.state.task;
    console.log('task',task)
    return (
      <div>
        <Card>
        <CardContent>
        <div>{task.title}</div>
        <div>Status: {Object.keys(StatusCode).find(x=>StatusCode[x]===task.status_code)}</div>
        <div>Blockers: <Blockers blockers={task.blockers} /></div>
        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Task;