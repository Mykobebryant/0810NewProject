/*
  注册容器组件
 */
import {connect} from 'react-redux';
//引入注册UI组件
import Register from '../components/register';
//actions
import {register} from '../redux/actions';

export default connect(
  state => ({user: state.user}), //状态数据
  {register}  //操作状态数据的方法
)(Register)