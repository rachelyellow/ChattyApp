import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import UsersOnline from "./UsersOnline.jsx";
import UserHandles from "./UserHandles.jsx";


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        name: "Anonymous"
      },
      messages: [],
      activeUsers: [],
      userHandlesActive: false
    }
  }


componentDidMount() {
  console.log("componentDidMount App");
  this.socket = new WebSocket(
    "ws://localhost:3001"
  );
    this.socket.onmessage = returnMsg => {
      const data = JSON.parse(returnMsg.data);
      switch (data.type) {
        case "incomingUserCount":
          this.setState({usersOnline: data.users});
        break;

        case "incomingUserList":
          this.setState({activeUsers: data.users})
        break;

        case "incomingMessage":
        case "incomingNotification":
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
        break;

      }
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
  if (message.trim() !== "") {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
  }
}

//sends updated username to server
addSystemMessage = (newUsername) => {
  if (newUsername !== this.state.currentUser.name && newUsername.trim() !== "") {
    let user = this.state.currentUser.name;
    const systemMsg = `${user} has changed their name to ${newUsername}.`
    const newMessage = {
      type: 'postNotification',
      content: systemMsg,
      userHandle: newUsername
    }
    this.socket.send(JSON.stringify(newMessage));
  }
}

// toggles list of active users
toggleUserList = () => {
  if (this.state.userHandlesActive) {
    this.setState({ userHandlesActive: false });
  } else {
    this.setState({ userHandlesActive: true });
  }
}


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <UsersOnline numOfUsers={this.state.usersOnline} toggleUserList={this.toggleUserList} />
        </nav>
        <div id="chat-window">
        <div id="messages-container">
          <MessageList messages={this.state.messages} />
        </div>
          <div id="users-container">
            <UserHandles className="users-container" activeUsers={this.state.activeUsers} active={this.state.userHandlesActive} />
          </div>
        </div>
        <ChatBar currentUser={this.state.currentUser} addUserMessage={this.addUserMessage} addSystemMessage={this.addSystemMessage} updateUser={this.updateUser} />
      </div>
    );
  }
}
export default App;
