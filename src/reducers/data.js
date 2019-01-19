import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

export const initState = {
  currentUsername: '',
  messages: {},
  channels: {},
  msgRequestStatus: 'success',
  newChannelRequestStatus: 'success',
};

export const currentUsername = handleActions({
  [actions.setCurrentUsername]: (state, { payload: { username } }) => username,
}, initState.currentUsername);

export const messages = handleActions({
  [actions.newMessage]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.deleteChannel]: (state, { payload: { id } }) => _.omitBy(state, msg => msg.channelId === id),
}, initState.messages);

export const channels = handleActions({
  [actions.newChannel]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.deleteChannel]: (state, { payload: { id } }) => _.omit(state, id),
}, initState.channels);

export const msgRequestStatus = handleActions({
  [actions.sendNewMessageSuccess]: () => 'success',
  [actions.sendNewMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);

export const newChannelRequestStatus = handleActions({
  [actions.sendNewChannelSuccess]: () => 'success',
  [actions.sendNewChannelFailure]: () => 'failure',
}, initState.newChannelRequestStatus);
