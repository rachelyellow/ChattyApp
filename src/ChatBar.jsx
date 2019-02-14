import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
  }


  handleMsgSubmit = event => {
    if (event.key === 'Enter') {
      this.props.addUserMessage(event.target.value);
      event.target.value = '';
    }
  }

  handleUsernameInput = event => {
    if (event.key === 'Enter') {
      this.props.updateUser(event.target.value);
      this.props.addSystemMessage(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.handleUsernameInput} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleMsgSubmit} />
      </footer>
    );
  }
}
export default ChatBar;


