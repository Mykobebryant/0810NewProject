/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {updateUnReadCount} from "../../redux/actions";

const Item = List.Item

export default class Chat extends Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    getChatMsgs: PropTypes.func.isRequired,
    chatList: PropTypes.object.isRequired,
    updateUnReadCount: PropTypes.func.isRequired
  }
  
  state = {
    content: '',
    isShow: false
  }
  
  sendMessage = () => {
    //发送者的id
    const from = Cookies.get('userid');
    //接受者的id
    const to = this.props.match.params.userid;
    //消息内容
    const {content} = this.state;
    //发送消息
    this.props.sendMessage({from, to, content});
    //清空用户的输入
    this.setState({
      content: ''
    })
  }
  
  componentWillMount () {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣', '🙉'];
  
    this.emojis = emojis.map(emoji => ({text: emoji}));
  }
  
  componentDidMount () {
    this.props.getChatMsgs();
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight);
  }
  
  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }
  
  componentWillUnmount ()  {
    this.props.updateUnReadCount(this.props.match.params.userid);
  }
  
  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({isShow})
    if (isShow) {
      //解决bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0)
    }
  }
  
  render() {
    const {chatList} = this.props;
  
    //发送者的id
    const from = Cookies.get('userid');
    //接受者的id
    const to = this.props.match.params.userid;
    
    if (!chatList.users[to]) {
      return null;
    }
  
    const targetUser = chatList.users[to];
    
    const chat_id = [from, to].sort().join('-');
    
    const chatMsgs = chatList.chatMsgs.filter(chatMsg => chatMsg.chat_id === chat_id);
  
    chatMsgs.sort((a, b) => {
      return Date.parse(a.create_time) - Date.parse(b.create_time)
    })
    console.log(chatList);
    
    return (
      <div id='chat-page'>
        <NavBar
          className="navbar-top"
          icon={<Icon type="left" onClick={() => this.props.history.goBack()}/>}
        >{targetUser.username}</NavBar>
        <List>
          {
            chatMsgs.map((chatMsg, index) => {
              if (chatMsg.to === from) {
                //说明消息是其他用户发送给当前用户的
                return (
                  <Item
                    thumb={require(`../../assets/images/${targetUser.header}.png`)}
                    key={index}
                  >
                    {chatMsg.content}
                  </Item>
                )
              } else {
                //说明消息是当前用户发送给其他用户的
                return (
                  <Item
                    className='chat-me'
                    extra='我'
                    key={index}
                  >
                    {chatMsg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <div>
                <span onClick={this.toggleShow}>🤣</span>
                <span onClick={this.sendMessage}>发送</span>
              </div>
            }
            onChange={val => this.setState({content: val})}
            value={this.state.content}
            onFocus={() => this.setState({isShow: false})}
          />
          {
            this.state.isShow ? (<Grid
              data={this.emojis}
              isCarousel
              onClick={_el => this.setState({content: this.state.content + _el.text})}
              columnNum={8}
              carouselMaxRow={4}
            />) : null
          }
        </div>
      </div>
    )
  }
}