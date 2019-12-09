import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import io from 'socket.io-client';
import gon from 'gon';
import _ from 'lodash';

import App from './components/App';
import reducer from './reducers';
import * as actions from './actions';
import setAndGetUsername from './setAndGetUsername';
import UsernameContext from './UsernameContext';

import 'regenerator-runtime/runtime';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/** channel = {
  id -> int
  name -> string,
  removable -> boolean,
  messages -> [ ...msgIds ]
}
 */

/** message = {
  id -> int,
  channelId -> int,
  username -> string,
  date -> int,
  content -> string
}
 */

const store = createStore(reducer, compose(applyMiddleware(thunk), applyMiddleware(logger)));

const socket = io();
socket.on('newMessage', ({ data }) => store.dispatch(actions.newMessage(data)));
socket.on('newChannel', ({ data }) => store.dispatch(actions.newChannel(data)));
socket.on('removeChannel', ({ data }) => store.dispatch(actions.deleteChannel(data)));
socket.on('renameChannel', ({ data }) => store.dispatch(actions.renameChannel(data)));

const { messages, channels } = gon;

channels.map((channel) => ({ id: channel.id, attributes: channel }))
  .forEach((record) => store.dispatch(actions.newChannel(record)));

const sortedMessages = _.sortedUniqBy(messages, ({ date }) => date);
sortedMessages.map((message) => ({ id: message.id, attributes: message }))
  .forEach((record) => store.dispatch(actions.newMessage(record)));

const username = setAndGetUsername();

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
