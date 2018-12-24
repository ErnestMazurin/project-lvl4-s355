import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import Channels from './components/channels';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const mountNode = document.getElementById('chat');
ReactDOM.render(<Channels channels={window.gon.channels}/>, mountNode);
