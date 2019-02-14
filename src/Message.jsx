import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <li className="message">
      { this.props.data.username ? <span className="message-username">{this.props.data.username}</span> : null}
        <span className="message-content">{this.props.data.content}</span>
      </li>
    );
  }
}
export default Message;







