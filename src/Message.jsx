import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <li className="message">
        <span className="message-username">{this.props.data.username}</span>
        <span className="message-content">{this.props.data.content}</span>
      </li>
    );
  }
}
export default Message;







