import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { changeChannel, addMessage } from '../actions';
import setAndGetUsername from '../setAndGetUsername';

const messagesMock = [
  { id: 1, channelId: 1, author: 'me', date: 'today', content: 'hello!' },
  { id: 2, channelId: 1, author: 'you', date: 'today', content: 'hi! What`s up?' },
  { id: 3, channelId: 1, author: 'me', date: 'today', content: 'wasaaap!!' },
  { id: 4, channelId: 2, author: 'you', date: 'today', content: 'hi!' },
  { id: 5, channelId: 2, author: 'me', date: 'today', content: 'oh, hi!' },
  { id: 6, channelId: 2, author: 'you', date: 'today', content: 'how are you?' },
];

const newUser = setAndGetUsername();

const initState = {
  currentChannelId: 1,
  messages: messagesMock,
  channels: window.gon.channels,
  username: newUser,
};

const currentChannelId = handleActions({
  [changeChannel]: (state, { payload: { id } }) => id,
}, initState.currentChannelId);

const messages = handleActions({
  [addMessage]: (state, { payload: { message } }) => [...state, message],
}, initState.messages);

const channels = handleActions({
}, initState.channels);

const username = handleActions({
}, initState.username);

export default combineReducers({
  currentChannelId,
  messages,
  channels,
  username,
  form: formReducer,
});
