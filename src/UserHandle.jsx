import React, {Component} from 'react';

class UserHandle extends Component {
  render() {
    return (
        <li className="user-handle" style={{color: this.props.activeUser.color}}>
            {this.props.activeUser.handle}
        </li>
    );
  }
}
export default UserHandle;







