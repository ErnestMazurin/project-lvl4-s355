import { connect } from 'react-redux';
import _ from 'lodash';
import Chat from '../components/Chat';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */

const mapStateToProps = ({ messages, currentChannelId, username }) => {
  const channelMessages = Object.values(messages)
    .filter(msg => msg.channelId === currentChannelId)
    .map(msg => ({ ...msg, isYou: (msg.author === username) }));
  return { messages: _.reverse(channelMessages) };
};

export default connect(mapStateToProps)(Chat);
