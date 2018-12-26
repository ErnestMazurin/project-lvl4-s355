import { connect } from 'react-redux';
import Channels from '../components/Channels';

const mapStateToProps = ({ channels }) => ({ channels });

export default connect(mapStateToProps)(Channels);
