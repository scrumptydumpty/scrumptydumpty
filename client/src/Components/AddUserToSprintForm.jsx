import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import api from "../api";

class AddUserToSprintForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint_id: props.sprint_id,
      username: "",
      users: [],
      status: 0 // display what when the menu is showing? 0 - not submitted, 1 - pending, 2 - success, 3 - failed
    };
    this.userChange = this.userChange.bind(this);
    // this.etaChange = this.etaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reload = this.reload.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(user_id) {
    const sprint_id = this.state.sprint_id;

    this.setState({ status: 1 });
    api
      .removeUserFromSprint({ sprint_id, user_id })
      .then(res => {
        if (!res) {
          this.setState({ status: 3 });
          return;
        }
        this.setState({ status: 2 }, this.reload());
      })
      .catch(err => console.log("err"));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.sprint_id !== this.state.sprint_id) {
      this.setState({ sprint_id: nextProps.sprint_id, users: [] }, () =>
        this.reload()
      );
    }
  }

  componentWillMount() {
    this.reload();
  }

  //** need to refactor so getUsersInSprint returns list of users in dating pool **

  //uses sprint id to fetch all users authorized to access that sprint
  reload() {
    api
      .getUsers()
      .then((userArr) => {
        let users = [];
        userArr.data.forEach( user => {
          if (this.props.user.id !== user.id) {
            users.push(user);
          }
        });
        this.setState({ users });
      })
  }

  onSubmit(e) {
    e.preventDefault();

    // sprint id passed down via props
    this.setState({ status: 1 });

    api
      .addUserToSprint({
        username: this.state.username,
        sprint_id: this.props.sprint_id
      })
      .then(res => {
        if (!res) {
          this.setState({ status: 3 });
          return;
        }
        this.setState({ status: 2, username: "" }, this.reload());
      });
  }

  userChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  render() {
    let interior = (
      <div>
        <TextField
          required
          id="user"
          label="Username"
          value={this.state.username}
          margin="normal"
          onChange={this.userChange}
        />
        <Button type="submit">Add Team Member</Button>
      </div>
    );

    if (this.state.status === 1) {
      interior = <div>Saving...</div>;
    }
    if (this.state.status === 2) {
      interior = <div>Success!</div>;
      setTimeout(() => {
        this.setState({ status: 0, title: "" });
      }, 1000);
    }
    if (this.state.status === 3) {
      interior = <div>Failed!</div>;
      setTimeout(() => {
        this.setState({ status: 0 });
      }, 1000);
    }
    return (
      <div
        style={{
          padding: "1.5em"
        }}
      >
        <div>
          {/* change Team Members to something punny for title of dating pool (broken pieces? all the kings men/women?) */}
          <strong>Team Members</strong>
        </div>
        <hr />
        <div>
        {this.state.users.map((user, i) => (
            <div key={i}>
              {this.props.isOwner &&
                user.id !== this.props.user.id && (
                  <Chip
                    avatar={
                      <Avatar>
                        <FaceIcon />
                      </Avatar>
                    }
                    label={user.username}
                    onDelete={() => this.deleteUser(user.id)}
                  />
                )}
            </div>
          ))}
        </div>
<<<<<<< HEAD
        {/* keeping this form until we are able to render all usernames */}
        {this.props.isOwner && (
          <form style={{ width: "150px" }} onSubmit={this.onSubmit}>
            {interior}
          </form>
        )}
=======
>>>>>>> 0e461deb7c77a5bfef7245324ea08059981dda6e
      </div>
    );
  }
}

export default AddUserToSprintForm;
