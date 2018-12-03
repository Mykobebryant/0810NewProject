import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserList from '../../containers/user-list';

class Laoban extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    getUserList: PropTypes.func.isRequired
  }
  
  componentDidMount () {
    //发送请求
    this.props.getUserList('dashen');
  }
  
  render () {
    const {userList} = this.props;
    return (
      <div>
        {
          userList.map((item, index) => <UserList key={index} item={item} />)
        }
      </div>
    )
  }
}

export default Laoban;