import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    return (
      <ul className="messages">
        {this.props.messages.map((message, index) =>
          <Message data={message} key={index} />)}
      </ul>
    );
  }
}
export default MessageList;
