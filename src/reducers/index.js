import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';
import setAndGetUsername from '../setAndGetUsername';

const messagesMock = {
  1: { id: 1, channelId: 1, author: 'me', date: 'today', content: 'hello!' },
  2: { id: 2, channelId: 1, author: 'you', date: 'today', content: 'hi! What`s up?' },
  3: { id: 3, channelId: 1, author: 'me', date: 'today', content: 'wasaaap!!' },
  4: { id: 4, channelId: 2, author: 'you', date: 'today', content: 'hi!' },
  5: { id: 5, channelId: 2, author: 'me', date: 'today', content: 'oh, hi!' },
  6: { id: 6, channelId: 2, author: 'you', date: 'today', content: 'how are you?' },
};

const newUser = setAndGetUsername();

const initState = {
  currentChannelId: 1,
  messages: messagesMock,
  channels: window.gon.channels,
  username: newUser,
  msgRequestStatus: 'success',
};

const messages = handleActions({
  [actions.addMessage]: (state, { payload }) => ({ ...state, ...payload }),
}, initState.messages);

const currentChannelId = handleActions({
  [actions.changeChannel]: (state, { payload: { id } }) => id,
}, initState.currentChannelId);

const channels = handleActions({
}, initState.channels);

const username = handleActions({
}, initState.username);

const msgRequestStatus = handleActions({
  [actions.sendMessageRequest]: () => 'request',
  [actions.sendMessageSuccess]: () => 'success',
  [actions.sendMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);

export default combineReducers({
  currentChannelId,
  messages,
  channels,
  username,
  msgRequestStatus,
  form: formReducer,
});
