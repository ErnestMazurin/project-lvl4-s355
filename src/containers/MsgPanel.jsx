import { connect } from 'react-redux';
import MsgPanel from '../components/MsgPanel';
import * as actionCreators from '../actions';

const mapStateToProps = ({ currentChannelId, username }) => ({ currentChannelId, username });

export default connect(mapStateToProps, actionCreators)(MsgPanel);
