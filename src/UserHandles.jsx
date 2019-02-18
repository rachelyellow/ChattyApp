import React, {Component} from 'react';
import UserHandle from "./UserHandle.jsx";

class UserHandles extends Component {
    render() {
      return (
        <ul className="handles-container">
          {this.props.activeUsers.map((activeUser, index) =>
            <UserHandle activeUser={activeUser} key={index} />)}
        </ul>
      );
    }
  }
  export default UserHandles;
  