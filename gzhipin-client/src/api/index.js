/*
  发送请求模块
 */

import ajax from './ajax';
// const prefix = 'http://localhost:4000';
const prefix = '';
//请求登录的函数
export const reqLogin = data => ajax(prefix + '/login', data, 'POST');
//请求注册的函数
export const reqRegister = data => ajax(prefix + '/register', data, 'POST');
//请求更新用户数据的函数
export const reqUpdateUserInfo = data => ajax(prefix + '/update', data, 'POST');
//请求获取用户数据的函数
export const reqGetUserInfo = () => ajax(prefix + '/user');
//请求获取用户列表数据的函数
export const reqGetUserList = type => ajax(prefix + '/userlist', {type});
//请求获取当前用户聊天列表数据的函数
export const reqGetChatMsgs = () => ajax(prefix + '/msglist');
//请求更新未读消息数量的函数
export const reqUpdateUnReadCount = from => ajax(prefix + '/readmsg', {from}, 'POST');