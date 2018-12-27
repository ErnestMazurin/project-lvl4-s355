import React from 'react';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */

const Message = ({ message: { author, date, content, isYou } }) => (
  <li className="list-group-item">
    <div className="container">
      <div className="row">
        <div className="text-secondary pr-3">{date}</div>
        <div className="text-body pl-0">{author}</div>
        {isYou ? <div className="text-success ml-2">(you)</div> : null}
      </div>
      <div className="row text-dark pt-2">{content}</div>
    </div>
  </li>
);


const Chat = ({ messages }) => (
  <ul className="list-group list-group-flush">
    {
      messages.map(msg => <Message key={msg.id} message={msg} />)
    }
  </ul>
);

export default Chat;
