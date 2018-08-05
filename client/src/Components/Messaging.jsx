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
  messenger: {
    position: 'fixed',
    bottom: '0px',
    right: '250px'
  },
  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    border: '1px solid black',
    position: 'relative',
    backgroundColor: 'white',
    minWidth: '300px',
    marginTop: 'auto',
    height: '100%'
  },
  message: {
    padding: '0px',
    listStyleType: 'none',
    float: 'left',
    fontName: 'Roboto',
    flex: '1',
    height: '300px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300px',
    overflow: 'auto',
    width: '100%',
    padding: '5px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  input: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    backgroundColor: 'white',
    right: '0px'
  }
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
    this.target = this.props.target.username;
  }

  componentDidMount() {
    this.setUser();

  }

  componentDidUpdate() {
    const div = document.getElementById('chatz')
    div.scrollTop = div.scrollHeight
    console.log(div.scrollTop)
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
      this.setState({ chatHistory: history })
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
    this.setState({ message: '' })
  }

  render() {
    const { classes } = this.props;
    const { chatHistory, message, sending } = this.state;

    return (
    <div className={classes.messenger}>
      <div className={classes.chatWindow}>
        <ul className={classes.message} id="chatz">
          {chatHistory.map(msg => <ChatMessage message={msg} />)}
        </ul>
       </div>
       <form onSubmit={this.sendMessage} style={{position: "relative", zIndex: "1", float: 'right', width: '100%'}}>
         <input type="text" value={message} onChange={this.handleChange} style={{width: '70%'}}/>
         <Button type="submit" disabled={sending} variant="contained" color="primary" className={classes.button} style={{width: '20%'}}>
           Send
           {/* <Icon className={classes.rightIcon}>
             send
           </Icon> */}
         </Button>
         {/* <input type="submit" value="Send" /> */}
       </form>
     </div>
    );
  }
}

export default withStyles(styles)(Messenger);
