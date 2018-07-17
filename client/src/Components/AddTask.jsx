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
}

titleChange(e){

  this.setState({title:e.target.value})
}

descriptionChange(e){
  this.setState({description:e.target.value})
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
        </div><div style={{'textAlign':'center'}}>
          <Button type="submit">Submit</Button>
          </div><div id = 'message'></div>
        </form>
        </div>
    );
  }
}


export default AddTask