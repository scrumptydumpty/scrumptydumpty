import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Blockers from './Blockers.jsx';
import { StatusCode } from '../../../lib/shared';

import { PRIORITY_COLOR } from '../../../lib/shared';


class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      title, description, priority_code, difficulty, eta,
    } = props.task;
    this.state = {
      title, description, priority_code, difficulty, eta,
    };
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priorityChange = this.priorityChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.etaChange = this.etaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
    console.log('submitting ');
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

  etaChange(e) {
    e.preventDefault();
    this.setState({ eta: e.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <CardContent style={{ padding: '5px', textAlign: 'center' }}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField required id="title" label="Title" defaultValue="" margin="normal" onChange={this.titleChange} />
              <TextField required id="description" label="Description" defaultValue="" margin="normal" onChange={this.descriptionChange} />
            </div>

            <TextField id="priority" select label="Priority" value={this.state.priority_code} onChange={this.handlePriorityChange} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="difficulty" select label="Difficulty" value={this.state.difficulty} onChange={this.handleDifficultyChange} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            <div style={{ textAlign: 'center' }}>
              <Button type="submit">
Submit
              </Button>
              <Button>
Delete
              </Button>
              <Button>
Add Blocker
              </Button>

            </div>
          </form>
        </CardContent>
      </div>
    );
  }
}

export default AddTaskForm;
