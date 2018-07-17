import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Tasks from "./Tasks.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper"

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
        <Paper>
        <Grid container spacing={24} justify="center">
          
          <Grid item xs={4}>
            NOT STARTED TASKS
          <Tasks tasks={notStarted} />
           
          </Grid>
            <Grid item xs={4}>
           
              IN PROGRESS TASKS
          <Tasks tasks={inProgress} />
         
          </Grid>
            <Grid item xs={4}>
         
            COMPLETED Tasks
         <Tasks tasks={complete} />
  
          </Grid>
        
        </Grid>
        </Paper>
      </div>
    );
  }
}

export default Sprint;