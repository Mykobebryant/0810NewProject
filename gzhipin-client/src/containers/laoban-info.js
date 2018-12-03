import {connect} from 'react-redux';

import LaobanInfo from '../components/laoban-info';

import {updateUserInfo} from '../redux/actions';

export default connect(
  state => ({user: state.user}),
  {updateUserInfo}
)(LaobanInfo)