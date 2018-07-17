import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Blockers from "./Blockers.jsx";

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
      <div><b>
        <div>Title: {task.title}</div>
        <div>Description: {task.title}</div>
        <div>Status: {Object.keys(StatusCode).find(x=>StatusCode[x]===task.status_code)}</div></b>
        <div>Blockers: <Blockers blockers={task.blockers} /></div>
      </div>
    );
  }
}

export default Task;