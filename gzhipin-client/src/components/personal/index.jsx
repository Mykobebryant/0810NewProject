/*
用户个人中心路由组件
 */
import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Item = List.Item
const Brief = Item.Brief

export default class Personal extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    resetUser: PropTypes.func.isRequired
  }
  
  logout = () => {
    Modal.alert('退出登录', '你确认退出登录?', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
        //退出登录
        //清除cookie
          Cookies.remove('userid');
          //清除当前的用户信息，实际上清除redux保管的user状态数据
          this.props.resetUser({});
        //路由跳转到登录页面
          this.props.history.replace('/login');
        }},
    ])
  }
  
  render() {
    const {user} = this.props;
    
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${user.header}.png`)} style={{width: 50}} alt="header"/>}
          title={user.username}
          message={user.company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {user.post}</Brief>
            <Brief>简介: {user.info}</Brief>
            {user.salary ? <Brief>薪资: {user.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}