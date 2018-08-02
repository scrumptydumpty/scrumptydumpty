import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

import api from '../api';


const dropdownMenuOptions = [{ label: 'Low', value: 0 },
  { label: 'Medium', value: 1 },
  { label: 'High', value: 2 },
  { label: 'Critical', value: 3 }];

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      description: '', 
      priority_code: 0, 
      difficulty: 0,
      open: false
    };

    this.addTask = this.addTask.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priorityChange = this.priorityChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    // this.etaChange = this.etaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  addTask() {
    const {
      title, description, priority_code, difficulty,
    } = this.state;

    api.addTask({
      title,
      description,
      priority_code,
      difficulty,
      sprint_id: this.props.sprint_id
    }).then((res) => {
      this.props.reload();
      //this.props.getNewUserTask(res);
      this.handleClose();
    });
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.state.title === "" && this.state.description === "") {
      this.setState({
        title: this.props.user.username,
        description: this.props.user.description
      }, () => this.addTask());
    } else {
      this.addTask();
    }
  }

  titleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  descriptionChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  priorityChange(e) {
    e.preventDefault();
    this.setState({ priority_code: e.target.value });
  }

  difficultyChange(e) {
    e.preventDefault();
    this.setState({ difficulty: e.target.value });
  }

  render() {
    const textFieldStyles = {
      marginLeft: "10px",
      marginRight: "10px",
      width: 200
    };

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Me</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nice! Add to your to-do list:</DialogTitle>
          <DialogContent>
            <form style={{ display: "table-caption", width: 400 }}>
              <FormControl>
                <TextField 
                  required id="title" label="Title" margin="normal"
                  defaultValue={this.props.user.username}
                  // value={this.state.title}  
                  onChange={this.titleChange} 
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    width: 380
                  }}/>
              </FormControl>
              <FormControl>
                <TextField 
                  required multiline rowsMax="7"
                  id="description" label="Description" margin="normal" 
                  defaultValue={this.props.user.description} 
                  onChange={this.descriptionChange} 
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    width: 380
                  }} />
              </FormControl>
              <FormControl>
                <TextField 
                  id="priority" select label="Priority" 
                  value={this.state.priority_code} 
                  onChange={this.priorityChange} margin="normal" 
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px"
                  }}>
                  {dropdownMenuOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl>
                <TextField 
                  id="difficulty" select label="Difficulty" 
                  value={this.state.difficulty} 
                  onChange={this.difficultyChange} margin="normal" 
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px"
                  }}>
                  {dropdownMenuOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddTaskForm;
