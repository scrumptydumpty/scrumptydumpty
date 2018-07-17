import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Tasks from "./Tasks.jsx";

class Sprint extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {'tasks':props.tasks}
  }

  componentWillReceiveProps({tasks}){
    this.setState({tasks});
  }
  
  render(){
    const tasks = this.state.tasks;
    const notStarted = tasks.filter(x => x.status_code === StatusCode.NotStarted);
    const inProgress = tasks.filter(x => x.status_code === StatusCode.InProgress);
    const complete = tasks.filter(x => x.status_code === StatusCode.Complete);
    //console.log(notStarted,inProgress,complete)
    return (
      <div>
        <div>NOT STARTED TASKS
          <Tasks tasks={notStarted} />
        
        </div>
        <div>
          IN PROGRESS TASKS
          <Tasks tasks={inProgress} />
        </div>
        <div>
          COMPLETED TASKS
         <Tasks tasks={complete} />
        </div>
      </div>
    );
  }
}

export default Sprint;