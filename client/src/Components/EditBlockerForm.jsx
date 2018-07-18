import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import api from '../api';
import Blocker from './Blocker.jsx';
import { StatusCode } from '../../../lib/shared';

const statusCodeMenu = [{ label: 'Not Started', value: 0 },
{ label: 'In Progress', value: 1 },
{ label: 'Complete', value: 2 }];

class EditBlockerForm extends React.Component {
  constructor(props) {
    super(props);
    const {
        id,
        title,
        description,
        task_id,
        status_code
    } = props.blocker;

    this.state = {
        id,
        title,
        description,
        task_id,
        status_code
    };

    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeBlocker = props.closeBlocker;
    this.reload = props.reload;
  }

  onDelete(e) {
    e.preventDefault();
    const id = this.state.id;
    api.updateBlocker({ id, status_code: 3 }).then(res => { this.closeBlocker(); this.reload() });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.blocker);
    const {
        id,
        title,
        description,
        task_id,
        status_code
    } = this.state;

    api.updateBlocker({
        id,
        title,
        description,
        task_id,
        status_code
    }).then(res => {this.closeBlocker(); this.reload()});
  }

  titleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  descriptionChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  statusChange(e) {
    e.preventDefault();
    this.setState({ status_code: e.target.value });
  }

  render() {
    return <div>
        <CardContent style={{ padding: "5px", textAlign: "center" }}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField required id="title" label="Title" defaultValue={this.state.title} margin="normal" onChange={this.titleChange} />
              <TextField required id="description" label="Description" defaultValue={this.state.description} margin="normal" onChange={this.descriptionChange} />
            </div>

            <TextField id="status_code" select label="Status" value={this.state.status_code} onChange={this.statusChange} defaultValue={this.state.status_code} margin="normal">
              {statusCodeMenu.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <div style={{ textAlign: "center" }}>
              <Button type="submit">Save</Button>
              <Button onClick={this.onDelete}>Delete</Button>
              <Button>Add Blocker</Button>
            </div>
          </form>
        </CardContent>
      </div>;
  }
}

export default EditBlockerForm;