import React from 'react'

const style = { 
  height: "500px"
  width: "375px",
  border: "1px solid black",
  position: "fixed",
  bottom: "0px",
  left: "0px"
}

class Messenger extends React.Component {
  constructor(props){
    super()
    this.state = {
      message: "",
      chatHistory: [],
      roomID: ""
    }
    this.socket = props.socket;
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ message: e.target.value })
  }
  
  sendMessage(e) {
    e.preventDefault();
    this.socket.emit('message', this.state.message, (msg)=>{console.log('Message receieved!')}
  }
  
  render() {
    return (
      <div style={style}>
      <form onSubmit={this.sendMessage}>
        <input type="text" value={this.state.message} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}