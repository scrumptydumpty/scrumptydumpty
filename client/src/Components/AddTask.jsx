import React from "react";
import { Link } from "react-router-dom";
import {StatusCode} from "../../../lib/shared";
import Tasks from "./Tasks.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon";
import api from "../api"

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class AddTask extends React.Component {

constructor(props){
  super(props);
  this.state = {title:'', description:''}
  this.onClose = props.handleClose
  this.onSubmit = this.onSubmit.bind(this)
  this.titleChange = this.titleChange.bind(this);
  this.descriptionChange = this.descriptionChange.bind(this)
  this.prioirtyChange = this.priorityChange.bind(this)
  this.difficultyChange = this.difficultyChange.bind(this)
}

titleChange(e){

  this.setState({title:e.target.value})
}

descriptionChange(e){
  this.setState({description:e.target.value})
}
priorityChange(e){
  this.setState({priority:e.target.value})
}
difficultyChange(e){
  this.setState({difficulty:e.target.value})
}
onSubmit(e){
e.preventDefault();


api.addTask(this.state.title,this.state.description)
  .then((res) => {
    if(!res){
      let displayMessage = document.getElementById('message');
      displayMessage.innerHTML = 'Error in submission';
      setTimeout( ()=> displayMessage = '', 2000)
      return;
    }

    this.onClose(true)
  })

}


onDelete(e){
  e.preventDefault();
  
  console.log('trying to delete') 
  // api.addTask(this.state.title,this.state.description)
  //   .then((res) => {
  //     if(!res){
  //       let displayMessage = document.getElementById('deleteMessage');
  //       displayMessage.innerHTML = 'Error in submission';
  //       setTimeout( ()=> displayMessage = '', 2000)
  //       return;
  //     }
  
      // this.onClose(true)
    // })
  
  }



  render() {

    return (
      <div>
        
        <form onSubmit={this.onSubmit}>
        <div>
        <FormControl >
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input id="title" value={this.state.title} onChange={this.titleChange} />
        </FormControl>
        </div><div>
        <FormControl >
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input id="description" value={this.state.description} onChange={this.descriptionChange} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Input id="priority" value={this.state.priority} onChange={this.priority} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
          <Input id="difficulty" value={this.state.difficulty} onChange={this.difficulty} />
        </FormControl>
        </div>
        <div style={{'textAlign':'center'}}>
          <Button type="submit">Submit</Button>
          </div><div id = 'message'></div>
          <div style={{'textAlign':'center'}}>
          <Button type="submit">Delete</Button>
          </div><div id = 'deleteMessage'></div>
          <div style={{'textAlign':'center'}}>
          <Button type="submit">Add Blocker</Button>
          </div><div id = 'blockerMessage'></div>
        </form>
        </div>
    );
  }
}


export default AddTask