import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Personal from "../../containers/personal";
import Laoban from "../../containers/laoban";
import Dashen from "../../containers/dashen";
import Message from "../../containers/message";
import NavFooter from "../../containers/nav-footer";
import Chat from "../../containers/chat";
import {getRedirectPath} from '../../utils';

class Main extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired
  }
  
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  
  render () {
    /*
    1. 本地没有cookie，跳转到登录页面（用户没有登录，一上来输入网址访问）
    2. 本地有cookie ， redux没有状态数据（用户登录了，刷新了页面），根据cookie发送请求请求当前用户的状态数据，保存在redux
    3. 本地有cookie ，并且redux有数据， 直接使用
   */
    // 1. 本地没有cookie，跳转到登录页面（用户没有登录，一上来输入网址访问）
    const userid = Cookies.get('userid');
    if (!userid) {
      // this.props.history.replace('/login');
      return <Redirect to='/login'/>;
    }
    // 2. 本地有cookie ， redux没有状态数据（用户登录了，刷新了页面），根据cookie发送请求请求当前用户的状态数据，保存在redux
    const {user} = this.props;
    //!user.msg  为了解决登录或者注册时提示错误信息
    if (!user._id && !user.msg) {
      //发送请求，请求用户的数据，保存在redux中
      this.props.getUserInfo();
      return <Icon type='loading' size='lg' style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'}}/>;
    }
    // 3. 本地有cookie ，并且redux有数据， 直接使用
    // 如果用户直接访问 / 路径，没有界面显示，重定向到/laoban  /dashen /laobanInfo  /dashenInfo
    //获取当前路由路径
    const {pathname} = this.props.location;
    
    if (pathname === '/') {
      return <Redirect to={getRedirectPath(user.type, user.header)}/>
    }
    
    const {navList} = this;
    
    if (user.type === 'dashen') {
      //如果当前type是dashen显示老板按钮
      navList[0].hide = true;
    } else {
      //如果当前type是laoban显示大神按钮
      navList[1].hide = true;
    }
    
    //当前路由路径对应显示的nav对象
    const currentNav = navList.find(nav => pathname === nav.path);
    
    return (
      <div>
        {currentNav ? <NavBar className="navbar-top">{currentNav.title}</NavBar> : ''}
        <div style={{paddingTop: '50px', paddingBottom: '60px'}}>
          <Switch>
            <Route path="/laobanInfo" component={LaobanInfo}/>
            <Route path="/laoban" component={Laoban}/>
            <Route path="/dashenInfo" component={DashenInfo}/>
            <Route path="/dashen" component={Dashen}/>
            <Route path="/message" component={Message}/>
            <Route path="/personal" component={Personal}/>
            <Route path="/chat/:userid" component={Chat}/>
          </Switch>
        </div>
        {currentNav ? <NavFooter navList={navList}/> : ''}
      </div>
    )
  }
}

export default Main;