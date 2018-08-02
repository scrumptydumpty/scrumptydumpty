import React from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
              Lizard
          </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography>
          </CardContent>
          <CardActions>
            <AddTaskForm
              sprint_id={this.props.sprint_id}
              reload={this.props.reload}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default SelectedProfile;
