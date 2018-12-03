import {connect} from 'react-redux';

import {sendMessage, getChatMsgs, updateUnReadCount} from '../redux/actions';
import Chat from '../components/chat';

export default connect(
  state => ({chatList: state.chatList}),
  {sendMessage, getChatMsgs, updateUnReadCount}
)(Chat)