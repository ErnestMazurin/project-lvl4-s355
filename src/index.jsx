import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import App from './components/App';
import reducer from './reducers';
import * as actions from './actions';

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
  username -> string,
  date -> int,
  content -> string
}
 */

const store = createStore(reducer, compose(applyMiddleware(thunk)));

const socket = io();
socket.on('newMessage', ({ data }) => store.dispatch(actions.newMessage(data)));
socket.on('newChannel', ({ data }) => store.dispatch(actions.newChannel(data)));
socket.on('removeChannel', ({ data }) => store.dispatch(actions.deleteChannel(data)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
