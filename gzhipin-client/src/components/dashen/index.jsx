import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserList from '../../containers/user-list';
import QueueAnim from 'rc-queue-anim';

class Dashen extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    getUserList: PropTypes.func.isRequired
  }
  
  componentDidMount () {
    //发送请求
    this.props.getUserList('laoban');
  }
  
  render () {
    const {userList} = this.props;
    return (
      <div>
        <QueueAnim delay={300} type='scale'>
          {
            userList.map((item, index) => <UserList key={index} item={item} />)
          }
        </QueueAnim>
      </div>
    )
  }
}

export default Dashen;