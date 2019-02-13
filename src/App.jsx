import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


class App extends Component {
  constructor() {
    super();
    this.state = {
      // currentUser: "Anonymous",
      messages: []
    }
  }



componentDidMount() {
  console.log("componentDidMount App");
  this.socket = new WebSocket(
    "ws://localhost:3001"
  );
    this.socket.onmessage = returnMsg => {
      const messages = this.state.messages.concat(JSON.parse(returnMsg.data));
      this.setState({messages: messages});
    }
}


//sends msg to server
addMessage = (message, user) => {
  user = user.trim() === "" ? "Anonymous" : user;
  const newMessage = {
    username: user,
    content: message
  }
  this.socket.send(JSON.stringify(newMessage));
}



  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
