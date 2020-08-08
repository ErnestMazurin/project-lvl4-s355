import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import reducer from './reducers';
import * as actions from './actions';
import setAndGetUsername from './setAndGetUsername';
import UsernameContext from './UsernameContext';
import { connect } from './StompClient';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/**
type Channel = {
  id: number;
  name: string;
  removable: boolean;
  messages: Array<number>; // message ids
}

type Message = {
  id: number;
  channelId: number;
  username: string;
  date: number;
  content: string;
}
 */

const store = createStore(reducer, compose(applyMiddleware(thunk), applyMiddleware(logger)));

// eslint-disable-next-line no-undef
SERVER_DATA.channels.forEach((channel) =>
  store.dispatch(
    actions.newChannel({
      id: channel.id,
      attributes: channel,
    }),
  ),
);

// eslint-disable-next-line no-undef
SERVER_DATA.messages.forEach((message) =>
  store.dispatch(
    actions.newMessage({
      id: message.id,
      attributes: message,
    }),
  ),
);

connect({
  '/topic/messages/new': ({ message }) =>
    store.dispatch(
      actions.newMessage({
        id: message.id,
        attributes: message,
      }),
    ),
  '/topic/channels/new': ({ channel }) =>
    store.dispatch(
      actions.newChannel({
        id: channel.id,
        attributes: channel,
      }),
    ),
  '/topic/channels/delete': ({ channel: { id } }) =>
    store.dispatch(
      actions.deleteChannel({
        id,
      }),
    ),
  '/topic/channels/rename': ({ channel }) =>
    store.dispatch(
      actions.renameChannel({
        id: channel.id,
        attributes: channel,
      }),
    ),
});

const username = setAndGetUsername();

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('my-slack-app'),
);
