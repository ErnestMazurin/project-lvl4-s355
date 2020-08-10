/* eslint-disable no-console */

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs/esm6/client';

let stompClient = null;
let URL = '/my-slack';

if (process.env.NODE_ENV === 'development') {
  URL = `http://localhost:8080${URL}`;
}

export const connect = (handlers /* Record<string, (message) => void> */) => {
  stompClient = new Client();
  stompClient.webSocketFactory = () => new SockJS(URL);
  stompClient.onConnect = () => {
    Object.keys(handlers).forEach((destination) => {
      stompClient.subscribe(destination, ({ body }) => {
        handlers[destination](JSON.parse(body));
      });
    });
  };
  stompClient.activate();
};
