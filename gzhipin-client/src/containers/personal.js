import {connect} from 'react-redux';

import Personal from '../components/personal';
import {resetUser} from '../redux/actions'
export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal);