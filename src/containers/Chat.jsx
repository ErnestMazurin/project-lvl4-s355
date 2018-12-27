import { connect } from 'react-redux';
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
  const channelMessages = messages
    .filter(msg => msg.channelId === currentChannelId)
    .map(msg => ({ ...msg, isYou: (msg.author === username) }));

  return { messages: channelMessages };
}

export default connect(mapStateToProps)(Chat);
