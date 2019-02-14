import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import UsersOnline from "./UsersOnline.jsx";


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        name: "Anonymous"
      },
      messages: [],
      usersOnline: ""
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


updateUser = (newUsername) => {
  if (newUsername !== this.state.currentUser.name) {
    let updatedName;
    updatedName = newUsername.trim() === "" ? "Anonymous" : newUsername;
    this.setState({
      currentUser: {name: updatedName}
    });
  }
}

//sends user msg to server
addUserMessage = (message) => {
  const newMessage = {
    type: 'postMessage',
    username: this.state.currentUser.name,
    content: message
  }
  this.socket.send(JSON.stringify(newMessage));
}

//sends updated username to server
addSystemMessage = (newUsername) => {
  if (newUsername !== this.state.currentUser.name && newUsername.trim() !== "") {
    let user = this.state.currentUser.name;
    const systemMsg = `${user} has changed their name to ${newUsername}.`
    const newMessage = {
      type: 'postNotification',
      content: systemMsg
    }
    this.socket.send(JSON.stringify(newMessage));
  }
}


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <UsersOnline numOfUsers={this.state.usersOnline} />
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addUserMessage={this.addUserMessage} addSystemMessage={this.addSystemMessage} updateUser={this.updateUser} />
      </div>
    );
  }
}
export default App;
