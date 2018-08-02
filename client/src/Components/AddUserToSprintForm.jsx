import React from "react";
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
    // this.etaChange = this.etaChange.bind(this);
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
        this.setState({ users }, () => {
          this.props.getDefaultSelectedProfile(this.state.users[0]);
        });
      })
  }

  render() {
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
                    style={{ marginBottom: "5px" }}
                    onDelete={() => this.deleteUser(user.id)}
                    onClick={() => this.props.getNewSelectedProfile(user)}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddUserToSprintForm;
