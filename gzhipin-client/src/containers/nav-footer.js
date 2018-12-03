import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import NavFooter from '../components/nav-footer';
//如果容器组件包着路由组件，会导致没办法重新渲染组件
//将路由组件包着容器组件才能重新渲染组件
export default withRouter(connect(
  state => ({unReadCount: state.chatList.unReadCount}),
  {}
)(NavFooter))