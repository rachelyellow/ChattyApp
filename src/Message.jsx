import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.data.type === "incomingMessage") {
      return (
        <li className="message">
          <span className="message-username">{this.props.data.username}</span>
          <span className="message-content">{this.props.data.content}</span>
        </li>
      );
    } else {
      return (
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      );
    }
  }
}
export default Message;







