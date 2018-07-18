import React from "react";
import {StatusCode} from "../../../lib/shared";
import Tasks from "./Tasks.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import api from "../api";


class Sprint extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {'tasks':props.tasks, 'open':false}
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps({tasks}){
    this.setState({tasks});
  }

    handleClickOpen (e) {
    e.preventDefault();
    this.setState({
      open: true,
    });
  }

  handleClose (shouldReload = false) {
   
    this.setState({
      open: false,
    });
    if(shouldReload){
  
      api.getTasks()
    .then(tasks=>{this.setState({tasks})});
    }
  }

  
  render(){
    const tasks = this.state.tasks;
    const notStarted = tasks.filter(x => x.status_code === StatusCode.NotStarted);
    const inProgress = tasks.filter(x => x.status_code === StatusCode.InProgress);
    const complete = tasks.filter(x => x.status_code === StatusCode.Complete);

    const addButtonStyle = {
      margin: 'auto'
      , backgroundColor:'white'
    }
    //console.log(notStarted,inProgress,complete)
    return (
      <div>
        <Paper>
        <Grid container spacing={24} justify="center">
          <Grid item xs={4}>
            NOT STARTED TASKS
          <Tasks tasks={notStarted} />
          <Grid container style={{textAlign: 'center'}}>
           
           Add shit
           
           </Grid>
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