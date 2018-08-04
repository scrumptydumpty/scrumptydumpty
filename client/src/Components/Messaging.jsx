import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import api from '../api';
import ChatMessage from './ChatHistory.jsx';

const styles = {
  button: {
    margin: '6px',
  },
  chatWindow: {
    display: 'inline-block',
    height: '50%',
    width: '50%',
    border: '1px solid black',
    position: 'fixed',
    // verticalAlign: 'bottom',
    // left: '0px',
    backgroundColor: 'white',
    // zIndex: '0',
    minWidth: '300px',
    overflow: 'scroll',
  },
  message: {
    listStyleType: 'none',
    fontName: 'Roboto',
    overflow: 'hidden',
  },
};

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message: "",
      chatHistory: [],
    };
    this.socket = props.socket;
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
    this.grabChat = this.grabChat.bind(this);
  }

  componentDidMount() {
    this.setUser();
  }

  componentWillReceiveProps(nextProps) {
    this.socket.emit('getChats', {user: this.state.user.username, target: nextProps.target.username});
    this.grabChat();
  }

  setUser() {
    api.verify().then((user) => {
      this.setState({ user })
    });
  }

  grabChat(){
    this.socket.on('chathistory', (history) => {
      this.setState({ chatHistory: history });
    })
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    const { message, user } = this.state;

    this.socket.emit('message', {user: user.username, target: this.props.target.username, message})
    this.grabChat()
  }

  render() {
    const { classes } = this.props;
    const { chatHistory, message, sending } = this.state;

    return (
      <div className={classes.chatWindow}>
         <form onSubmit={this.sendMessage}>
           <input type="text" value={message} onChange={this.handleChange} />
           <Button type="submit" disabled={sending} variant="contained" color="primary" className={classes.button}>
             Send
             {/* <Icon className={classes.rightIcon}>
               send
             </Icon> */}
           </Button>
           {/* <input type="submit" value="Send" /> */}
         </form>
         <ul className={classes.message}>
           {chatHistory.map(msg => <ChatMessage message={msg} />)}
         </ul>
       </div>
    );
  }
}

export default withStyles(styles)(Messenger);
