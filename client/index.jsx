import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import reducer from './reducers';
import * as actions from './actions';
import UsernameContext from './UsernameContext';
import { connect } from './StompClient';

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

const store = createStore(reducer, applyMiddleware(thunk));

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

const firstName = cookies.get('firstname');
const lastName = cookies.get('lastname');

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={`${firstName} ${lastName}`}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('my-slack-app'),
);
