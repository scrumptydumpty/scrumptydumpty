import React from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../api';
import AddBlockerForm from './AddBlockerForm.jsx';


const dropdownMenuOptions = [{ label: 'Low', value: 0 },
  { label: 'Medium', value: 1 },
  { label: 'High', value: 2 },
  { label: 'Critical', value: 3 }];


const statusCodeMenu = [{ label: 'Not Started', value: 0 },
  { label: 'In Progress', value: 1 },
  { label: 'Complete', value: 2 }];

class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
   
    const {
      id,
      title, description, priority_code, difficulty, eta, status_code,
    } = props.task;

    this.state = {
      sprint_id: props.sprint_id,
      id,
      title,
      description,
      priority_code,
      difficulty,
      eta,
      status_code,
    };

    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priorityChange = this.priorityChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.etaChange = this.etaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeTask = props.closeTask;
    this.reload = props.reload;
  }

  onDelete(e) {
    e.preventDefault();
    const id = this.state.id;
    api.updateTask({ id, status_code: 3 }).then((res) => { this.closeTask(); this.reload(); });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.task);
    const {
      id,
      title, description, priority_code, difficulty, status_code,
    } = this.state;

    api.updateTask({
      id,
      title,
      description,
      priority_code,
      difficulty,
      status_code, sprint_id: this.state.sprint_id
    }).then((res) => { this.closeTask(); this.reload(); });
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

  statusChange(e) {
    e.preventDefault();
    this.setState({ status_code: e.target.value });
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
    return (
      <div>
  <CardContent style={{ padding: '5px', textAlign: 'center' }}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField required id="title" label="Title" defaultValue={this.state.title} margin="normal" onChange={this.titleChange} />
              <TextField required id="description" label="Description" defaultValue={this.state.description} margin="normal" onChange={this.descriptionChange} />
            </div>

            <TextField id="priority" select label="Priority" defaultValue={this.state.priority_code} value={this.state.priority_code} onChange={this.priorityChange} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="difficulty" select label="Difficulty" value={this.state.difficulty} onChange={this.difficultyChange} defaultValue={this.state.difficulty} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="status_code" select label="Status" value={this.state.status_code} onChange={this.statusChange} defaultValue={this.state.status_code} margin="normal">
              {statusCodeMenu.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <div style={{ textAlign: 'center' }}>
              <Button type="submit">
Save
</Button>
              <Button onClick={this.onDelete}>
Delete Task
</Button>
            </div>
          </form>
          <AddBlockerForm task_id={this.state.id} />
        </CardContent>
</div>
    );
  }
}

export default EditTaskForm;
