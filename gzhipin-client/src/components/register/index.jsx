import React, {Component} from 'react';
import {NavBar, List, InputItem, Button, WingBlank, WhiteSpace, Radio} from 'antd-mobile';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Logo from '../logo';

const Item = List.Item;

class Register extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  }
  
  state = {
    username: '',
    password: '',
    rePassword: '',
    type: 'laoban'
  }
  
  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val
    })
  }
  /*
    代理proxy：
      1. 是什么？ 全称代理服务器，
        将用户/浏览器发送的请求拦截下来, 转发请求到新地址，访问请求的资源，最终将响应转发给用户/浏览器
      2. 作用： 解决浏览器跨域问题
      3. 位置在哪：浏览器端
      4. 只在开发时使用，项目上线时还是需要使用jsonp或者cors技术解决跨域问题
      5. 使用： 在package.json文件 加一个字段 proxy: 'http://localhost:4000'
   */
  register = async () => {
    //获取表单数据
    const {username, rePassword, password, type} = this.state;
    //发送ajax，更新状态
    this.props.register({username, password, rePassword, type});
  }
  
  goLogin = () => {
    //跳转到登录路由，编程式导航
    this.props.history.replace('/login');  //替换浏览历史记录
  }
  
  render () {
    const {type} = this.state;
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
        <WingBlank>
          {msg ? <p className='err-msg'>{msg}</p> : ''}
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
              <InputItem
                placeholder="请输入确认密码"
                type="password"
                onChange={val => this.handleChange('rePassword', val)}>确认密码：</InputItem>
              <WhiteSpace />
              <Item>
                用户类型： &nbsp;&nbsp;
                <Radio
                  className="my-radio"
                  checked={type === 'dashen'}
                  onClick={() => this.handleChange('type', 'dashen')}
                >大神</Radio> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  className="my-radio"
                  checked={type === 'laoban'}
                  onClick={() => this.handleChange('type', 'laoban')}
                >老板</Radio>
              </Item>
              <WhiteSpace />
              <Button type="primary" onClick={this.register}>注 册</Button>
              <WhiteSpace />
              <Button onClick={this.goLogin}>已有账户</Button>
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}

export default Register;