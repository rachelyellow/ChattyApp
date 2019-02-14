import React, {Component} from 'react';

class UsersOnline extends Component {
  render() {
    return (
      <div id="userCount">{this.props.numOfUsers} users online</div>
    );
  }
}

export default UsersOnline;