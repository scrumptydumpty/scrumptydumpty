import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Blockers from "./Blockers.jsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';

import {PRIORITY_COLOR} from "../../../lib/shared"

class Task extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {'task':props.task, 'shadow':1};
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentWillReceiveProps({task}){
    this.setState({task});
  }

  onMouseOver(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({shadow:3})
  }
  onMouseOut(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({shadow:1})
  }
  
  render(){
    const task = this.state.task;
    const borderColor = PRIORITY_COLOR[task.priority_code]
 
    const style = {
      borderRadius:'10px',
      margin:'10px',
       'borderLeft':'2px solid',
        'borderLeftColor':borderColor ,
        
      };
      if(this.state.shadow===3){
        style['boxShadow']='0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      }
    return (
      <div>
        <Card 
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={style}>
        <CardContent style={{padding:'5px', textAlign:'center'}}>
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