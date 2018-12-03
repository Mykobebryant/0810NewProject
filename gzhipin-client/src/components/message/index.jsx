/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {List, Badge} from 'antd-mobile'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const Item = List.Item
const Brief = Item.Brief



class Message extends Component {
  static propTypes = {
    getChatMsgs: PropTypes.func.isRequired,
    chatList: PropTypes.object.isRequired
  }
  
  getChatMsgs = (chatList, userid) => {
    /*if (!chatList.chatMsgs) {
      return [];
    }*/
    
    let lastChatObj = {};
  
    chatList.chatMsgs.forEach(chatMsg => {
      const {chat_id} = chatMsg;
      const msg = lastChatObj[chat_id];
      if (!msg) {
        //代表第一次添加
        //判断消息是否是未读的消息
        if (!chatMsg.read && chatMsg.to === userid) {
          chatMsg.unReadCount = 1;
        } else {
          chatMsg.unReadCount = 0;
        }
        lastChatObj[chat_id] = chatMsg;
      } else {
        //代表之前添加过了，当前chatMsg对象与之前的对象的创建时间对比，保留最新/最大的
        if (Date.parse(chatMsg.create_time) > Date.parse(msg.create_time)) {
          //保留之前的未读消息记录
          chatMsg.unReadCount = msg.unReadCount;
          lastChatObj[chat_id] = chatMsg
        }
        //不管消息是否最新，都得判断是否是未读消息
        if (!chatMsg.read && chatMsg.to === userid) {
          lastChatObj[chat_id].unReadCount++;
        }
      }
    })
    // 将lastChatObj里面值组成一个数组
    let chatMsgs = Object.values(lastChatObj);
    // 按照时间顺序，从大到小排序
    chatMsgs.sort((next, curr) => {
      return Date.parse(curr.create_time) - Date.parse(next.create_time);  //从大到小排序
    })
    //返回出去
    return chatMsgs;
  }
  
  componentDidMount () {
    //发送请求，请求用户所有的聊天数据
    this.props.getChatMsgs();
  }
  
  render() {
    /*
      功能：显示聊天消息列表
      需求： 1. 同类的消息合并成1条显示  2. 消息列表按时间顺序从上到下排序
      实现步骤：
        1. 将同类的消息只保留一个最新的消息， lastChatObj = {}   key : chat_id  value: chatMsg(最新的)
        2. 将lastChatObj里面值组成一个数组, 按照时间顺序，从大到小排序
     */
    const {chatList} = this.props;
    //当前登录的用户的userid
    const userid = Cookies.get('userid');
    
    const chatMsgs = this.getChatMsgs(chatList, userid);
    console.log(chatMsgs);
    
    return (
      <List>
        {
          chatMsgs.map((chatMsg, index) => {
            const {from, to, content, unReadCount} = chatMsg;
            //得到发送消息的用户的userid
            const id = userid === from ? to : from;
            //根据用户的userid找到对应的头像和用户名数据
            const {header, username} = chatList.users[id];
            
            return (
              <Item
                extra={<Badge text={unReadCount}/>}
                thumb={require(`../../assets/images/${header}.png`)}
                arrow='horizontal'
                key={index}
                onClick={() => this.props.history.push(`/chat/${id}`)}
              >
                {content}
                <Brief>{username}</Brief>
              </Item>
            )
          })
        }
        
      </List>
    )
  }
}

export default Message