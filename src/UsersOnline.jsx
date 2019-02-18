import React, {Component} from 'react';

class UsersOnline extends Component {
  render() {
    return (
      <button id="user-count" >{this.props.numOfUsers} users online</button>
    );
  }
}

export default UsersOnline;