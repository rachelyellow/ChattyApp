import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.data.type === "incomingMessage") {
      return (
        <li className="message">
          <span className="message-username" style={{color: this.props.data.color}} >{this.props.data.username}</span>
          <span className="message-content">{this.props.data.content}</span>
        </li>
      );
    } else {
      return (
        <div className="message system">
          {this.props.data.content}
        </div>
      );
    }
  }
}
export default Message;







