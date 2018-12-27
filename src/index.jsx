import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import App from './containers/App';
import reducer from './reducers';
import * as actions from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/** channel = {
  id -> int
  name -> string,
  removable -> boolean,
}
 */

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */


const store = createStore(reducer, compose(applyMiddleware(logger), applyMiddleware(thunk)));
const socket = io();

socket
  .on('newMessage', ({ data }) => store.dispatch(actions.addMessage(data)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
