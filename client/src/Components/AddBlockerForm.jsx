import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import api from '../api';


class AddBlockerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task_id: props.task_id,
      title: '',
      hidden: true,
      status: 0, // display what when the menu is showing? 0 - not submitted, 1 - pending, 2 - success, 3 - failed
    };

    this.titleChange = this.titleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  showForm(e) {
    this.setState({ hidden: false });
  }

  onSubmit(e) {
    e.preventDefault();
    const { task_id, title } = this.state;
    const description = 'In Addblockers form';
    this.setState({ status: 1 });
    api.addBlocker({ task_id, title, description }).then((res) => {
      if (!res) {
        this.setState({ status: 3 }); return;
      }
      this.setState({ status: 2 });
    });
  }

  titleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  render() {
    if (this.state.hidden) {
      return (
        <div>
          <Button onClick={this.showForm}>
            Add Blocker
          </Button>
        </div>
      );
    }

    let interior = (
      <div>
        <TextField required id="title" label="Blocker" value={this.state.title} margin="normal" onChange={this.titleChange} />
        <Button type="submit">
        Save
        </Button>

      </div>
    );

    if (this.state.status === 1) {
      interior = (
        <div>
Saving...
        </div>
      );
    }
    if (this.state.status === 2) {
      interior = (
        <div>
Success!
        </div>
      );
      setTimeout(() => {
        this.setState({ status: 0, title: '' });
      }, 1000);
    }
    if (this.state.status === 3) {
      interior = (
        <div>
Failed to Save!
        </div>
      );
      setTimeout(() => {
        this.setState({ status: 0 });
      }, 1000);
    }

    return (
      <div>

        <form onSubmit={this.onSubmit}>
          <div>
            {interior}
          </div>
        </form>
      </div>
    );
  }
}

export default AddBlockerForm;
