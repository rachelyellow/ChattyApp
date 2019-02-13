import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currentUser: 'Anonymous'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.props.addMessage(this.state.value, this.state.currentUser);
      this.setState({value: ''});
    }
  }

  handleUsernameInput(event) {
      this.setState({currentUser: event.target.value})
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onChange={this.handleUsernameInput} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          value={this.state.value} />
      </footer>
    );
  }
}
export default ChatBar;


