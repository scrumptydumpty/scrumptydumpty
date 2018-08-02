import React from 'react';


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.socket = props.socket  
  }

  registerHandler(onMessageReceived) {
    this.socket.on('message', onMessageReceived)
  }
  
  unregisterHandler(onMessageReceived) {
    this.socket.off('message')
  }

  register(name, cb){
    this.socket.emit('register', name, cb)
  }
  
  join(chatroomName, cb) {
    this.socket.emit('join', chatroomName, cb)
  }
  
  leave(chatroomName, cb) {
    this.socket.emit('leave', chatroomName, cb)
  }

  message(chatroomName, msg, cb){
    this.socket.emit('message', { chatroomName, message: msg}, cb)
  }
  
  render() {
    return (<div>CHAT MESSAGING</div>)
  }
}




export default Chat