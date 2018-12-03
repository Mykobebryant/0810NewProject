import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavBar, List, InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import {Redirect} from 'react-router-dom';

import Logo from '../logo';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }
  
  state = {
    username: '',
    password: ''
  }
  
  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val
    })
  }
  
  login = async () => {
    //发送ajax请求
    this.props.login(this.state);
  }
  
  goRegister = () => {
    //跳转到登录路由，编程式导航
    this.props.history.replace('/register');  //替换浏览历史记录
  }
  
  render () {
    const {msg, redirectTo} = this.props.user;
  
    if (redirectTo) {
      //编程式导航
      // this.props.history.replace(redirectTo);
      //路由链接跳转
      return <Redirect to={redirectTo} />
    }
    
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo />
        {msg ? <p className='err-msg'>{msg}</p> : ''}
        <WingBlank>
          <form>
            <List>
              <WhiteSpace />
              <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)}>用户名：</InputItem>
              <WhiteSpace />
              <InputItem
                placeholder="请输入密码"
                type="password"
                onChange={val => this.handleChange('password', val)}
              >密码：</InputItem>
              <WhiteSpace />
              <Button type="primary" onClick={this.login}>登 录</Button>
              <WhiteSpace />
              <Button onClick={this.goRegister}>没有账户</Button>
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}

export default Login;