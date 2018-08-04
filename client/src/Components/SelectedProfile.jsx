import React from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Messenger from './Messaging.jsx'
class SelectedProfile extends React.Component {
  render() {
    const styles = {
      card: {
        maxWidth: 345,
        margin: "0 auto"
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    };

    let { profile_image_url } = this.props.selectedProfile;

    if (profile_image_url === 'NULL' || profile_image_url === undefined || profile_image_url === null) {
      profile_image_url = 'https://www.rebornmasculinity.com/wp-content/uploads/2017/12/Russian-women.jpg';
    };

    let addButton;

    if (this.props.noShows.includes(this.props.selectedProfile.id)) {
      addButton = <div />;
    } else {
      addButton = (
        <CardActions>
          <AddTaskForm
            sprint_id={this.props.sprint_id}
            reload={this.props.reload}
            selected={this.props.selectedProfile}
            updateNoShows={this.props.updateNoShows}
          />
        </CardActions>);
    }

    return (
      <div>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            image={profile_image_url}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.selectedProfile.username}
            </Typography>
            <Typography component="p">
              {this.props.selectedProfile.description}
            </Typography>
          </CardContent>
          {addButton}
        </Card>
      </div>
    );
  }
}

export default SelectedProfile;
