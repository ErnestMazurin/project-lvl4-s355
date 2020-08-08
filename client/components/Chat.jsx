import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actionCreators from '../actions';
import UsernameContext from '../UsernameContext';

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

const mapStateToProps = ({ messages: { byId, allIds }, channels, ui: { currentChannelId } }) => {
  if (!_.has(channels.byId, currentChannelId)) {
    return { messages: [] };
  }

  const currentChannel = channels.byId[currentChannelId];
  const messagesInChannelIds = currentChannel.messages;
  const messages = allIds
    .filter((id) => messagesInChannelIds.indexOf(id) !== -1)
    .map((id) => byId[id])
    .map((msg) => ({ ...msg, isYou: false }));

  return { messages };
};

const renderDate = (date) =>
  new Date(date).toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

const Message = ({ message: { username, date, content } }) => (
  <li className="list-group-item">
    <div className="container">
      <UsernameContext.Consumer>
        {(current) => (
          <div className="row">
            <div className="text-body pl-0">{username}</div>
            {current === username && <div className="text-success ml-2">(you)</div>}
            <div className="text-secondary pl-3">{renderDate(date)}</div>
          </div>
        )}
      </UsernameContext.Consumer>
      <div className="row text-dark pt-2">{content}</div>
    </div>
  </li>
);

class Chat extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="list-group list-group-flush">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </ul>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Chat);
