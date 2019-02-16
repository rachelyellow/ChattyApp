import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.data.type === "incomingMessage") {
      const imgLink = this.props.data.content.match(/(https?:\/\/.*\.(?:png|jpg|gif))/gi);
      if (imgLink) {
        const imgIndex = this.props.data.content.search(imgLink);
        const msgOnly = this.props.data.content.replace(imgLink, "");
        return (
          <li className="message">
            <span className="message-username" style={{color: this.props.data.color}}>{this.props.data.username}</span>
            <div className="message-content">
              <span className="message-content">{msgOnly}</span>
              <div className="message-img-container">
                <img className="message-img" src={imgLink} />
              </div>
            </div>
          </li>
        );
      }
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







