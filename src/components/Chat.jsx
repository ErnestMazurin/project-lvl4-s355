import React from 'react';

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> string,
  content -> string
}
 */

const Message = ({ message: { username, date, content, isYou } }) => {
  const dateObj = new Date(date);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const dateString = dateObj.toLocaleString('ru', options);
  return (
    <li className="list-group-item">
      <div className="container">
        <div className="row">
          <div className="text-body pl-0">{username}</div>
          {isYou ? <div className="text-success ml-2">(you)</div> : null}
          <div className="text-secondary pl-3">{dateString}</div>
        </div>
        <div className="row text-dark pt-2">{content}</div>
      </div>
    </li>
  );
};


const Chat = ({ messages }) => (
  <ul className="list-group list-group-flush">
    {messages.map(msg => <Message key={msg.id} message={msg} />)}
  </ul>
);

export default Chat;
