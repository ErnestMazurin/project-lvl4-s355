import React from 'react';
import connect from '../connect';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> string,
  content -> string,
}
 */

/** channel = {
  id -> int,
  name -> string,
  removable -> boolean,
  messages -> [...msgIds],
}
 */

const mapStateToProps = (
  {
    messages: { byId, allIds },
    channels,
    currentUsername,
    ui: { currentChannelId },
  },
) => {
  if (!_.has(channels.byId, currentChannelId)) {
    return { messages: [] };
  }

  const currentChannel = channels.byId[currentChannelId];
  const messagesInChannelIds = currentChannel.messages;
  const messages = allIds.filter(id => messagesInChannelIds.indexOf(id) !== -1)
    .map(id => byId[id])
    .map(msg => ({ ...msg, isYou: msg.username === currentUsername }));
  return { messages };
};

const renderDate = date => new Date(date).toLocaleString('ru', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const Message = ({ message: { username, date, content, isYou } }) => (
  <li className="list-group-item">
    <div className="container">
      <div className="row">
        <div className="text-body pl-0">{username}</div>
        {isYou ? <div className="text-success ml-2">(you)</div> : null}
        <div className="text-secondary pl-3">{renderDate(date)}</div>
      </div>
      <div className="row text-dark pt-2">{content}</div>
    </div>
  </li>
);

@connect(mapStateToProps)
class Chat extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="list-group list-group-flush">
        {messages.map(msg => <Message key={msg.id} message={msg} />)}
      </ul>
    );
  }
}

export default Chat;
