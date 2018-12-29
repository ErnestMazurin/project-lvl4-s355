import { connect } from 'react-redux';
import _ from 'lodash';
import Chat from '../components/Chat';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> string,
  content -> string
}
 */

const mapStateToProps = ({ messages, currentChannelId, currentUsername }) => {
  const channelMessages = Object.values(messages)
    .filter(msg => msg.channelId === currentChannelId)
    .map(msg => ({ ...msg, isYou: (msg.username === currentUsername) }));
  return { messages: _.reverse(channelMessages) };
};

export default connect(mapStateToProps)(Chat);
