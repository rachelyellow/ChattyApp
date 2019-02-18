import React, {Component} from 'react';

class UserHandle extends Component {
  render() {
    return (
        <li className="user-handle" style={{color: this.props.activeUser.color}}>
            <b>{this.props.activeUser.handle}</b>
        </li>
    );
  }
}
export default UserHandle;







