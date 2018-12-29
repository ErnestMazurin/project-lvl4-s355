import { connect } from 'react-redux';
import MsgPanel from '../components/MsgPanel';
import * as actionCreators from '../actions';

const mapStateToProps = ({ currentChannelId, currentUsername, msgRequestStatus }) =>
  ({ currentChannelId, currentUsername, msgRequestStatus });

export default connect(mapStateToProps, actionCreators)(MsgPanel);
