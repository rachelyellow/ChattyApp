import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    return (
      <ul className="messages">
        {this.props.messages.map((message, index) =>
          <Message data={message} key={index} userColor={this.props.userColor} />)}
      </ul>
    );
  }
}
export default MessageList;
