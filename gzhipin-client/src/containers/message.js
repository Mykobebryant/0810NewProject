import {connect} from 'react-redux';

import Message from '../components/message';
import {getChatMsgs} from '../redux/actions';

export default connect(
  state => ({chatList: state.chatList}),
  {getChatMsgs}
)(Message);