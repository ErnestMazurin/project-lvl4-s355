import gon from 'gon';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';
import setAndGetUsername from '../setAndGetUsername';

const newUser = setAndGetUsername();

const initState = {
  currentChannelId: 1,
  currentUsername: newUser,
  messages: gon.messages,
  channels: gon.channels,
  msgRequestStatus: 'success',
  newChannelRequestStatus: 'success',
};

const messages = handleActions({
  [actions.addMessage]: (state, { payload }) => ({ ...state, ...payload }),
}, initState.messages);

const currentChannelId = handleActions({
  [actions.changeChannel]: (state, { payload: { id } }) => id,
}, initState.currentChannelId);

const channels = handleActions({
  [actions.addChannel]: (state, { payload: { attributes } }) => [...state, attributes],
}, initState.channels);

const currentUsername = handleActions({
}, initState.currentUsername);

const msgRequestStatus = handleActions({
  [actions.sendMessageSuccess]: () => 'success',
  [actions.sendMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);

const newChannelRequestStatus = handleActions({
  [actions.sendNewChannelSuccess]: () => 'success',
  [actions.sendNewChannelFailure]: () => 'failure',
}, initState.newChannelRequestStatus);

export default combineReducers({
  currentChannelId,
  messages,
  channels,
  currentUsername,
  msgRequestStatus,
  newChannelRequestStatus,
  form: formReducer,
});
