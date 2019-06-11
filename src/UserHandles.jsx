import React, {Component} from 'react';
import UserHandle from "./UserHandle.jsx";

class UserHandles extends Component {
  render() {
    if (this.props.active) {
      return (
        <ul className="handles-container">
          {this.props.activeUsers.map((activeUser, index) =>
            <UserHandle activeUser={activeUser} key={index} />)}
        </ul>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default UserHandles;
  