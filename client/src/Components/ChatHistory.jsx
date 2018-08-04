import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';

const ChatMessage = (props) => {
  const { message } = props;

  return (
    <div>
      
      <Typography variant="body1" gutterBottom>
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label={message.user}
          style={{ marginBottom: '5px', marginRight: '5px' }}
        />
        {message.message}
      </Typography>
    </div>
  );
};

export default ChatMessage;
