/* eslint-disable no-console */

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export const connect = (handlers /* Record<string, (message) => void> */) => {
  const socket = new SockJS('/my-slack');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    console.log(`Connected: ${frame}`);
    Object.keys(handlers).forEach((destination) => {
      stompClient.subscribe(destination, ({ body }) => {
        handlers[destination](JSON.parse(body));
      });
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  console.log('Disconnected');
};

export const sendMessage = (destination, message) => {
  stompClient.publish({ destination, body: JSON.stringify(message) });
};
