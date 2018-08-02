import React from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class SelectedProfile extends React.Component {
  render() {
    const styles = {
      card: {
        maxWidth: 345
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    };

    return (
      <div>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            image="https://www.rebornmasculinity.com/wp-content/uploads/2017/12/Russian-women.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.selectedProfile.username}
          </Typography>
            <Typography component="p">
              {this.props.selectedProfile.description}
          </Typography>
          </CardContent>
          <CardActions>
            <AddTaskForm
              sprint_id={this.props.sprint_id}
              reload={this.props.reload}
              user={this.props.selectedProfile}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default SelectedProfile;
