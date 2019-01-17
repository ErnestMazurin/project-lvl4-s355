import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const initState = {
  currentChannelId: 1,
  currentUsername: '',
  messages: {},
  channels: [],
  msgRequestStatus: 'success',
  newChannelRequestStatus: 'success',
  ui: {
    deleteChannelModal: {
      show: false,
      channelName: undefined,
      channelId: undefined,
      isInputValid: true,
    },
    newChannelModal: {
      show: false,
    },
  },
};

const currentChannelId = handleActions({
  [actions.changeChannel]: (state, { payload: { id } }) => id,
}, initState.currentChannelId);

const currentUsername = handleActions({
  [actions.setCurrentUsername]: (state, { payload: { username } }) => username,
}, initState.currentUsername);

const messages = handleActions({
  [actions.newMessage]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.deleteChannel]: (state, { payload: { id } }) => _.omitBy(state, msg => msg.channelId === id),
}, initState.messages);

const channels = handleActions({
  [actions.newChannel]: (state, { payload: { attributes } }) => [...state, attributes],
  [actions.deleteChannel]: (state, { payload: { id } }) => state.filter(channel => channel.id !== id),
}, initState.channels);

const msgRequestStatus = handleActions({
  [actions.sendNewMessageSuccess]: () => 'success',
  [actions.sendNewMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);

const newChannelRequestStatus = handleActions({
  [actions.sendNewChannelSuccess]: () => 'success',
  [actions.sendNewChannelFailure]: () => 'failure',
}, initState.newChannelRequestStatus);

const ui = handleActions({
  [actions.showDeleteChannelModal]: (state, { payload: { id, name } }) => ({
    ...state,
    deleteChannelModal: {
      isInputValid: true,
      show: true,
      channelName: name,
      channelId: id,
    },
  }),
  [actions.hideDeleteChannelModal]: state => ({
    ...state,
    deleteChannelModal: {
      isInputValid: true,
      show: false,
      channelName: undefined,
      channelId: undefined,
    },
  }),
  [actions.validateDeleteChannelModal]: (state, { payload: { isInputValid } }) => ({
    ...state,
    deleteChannelModal: {
      ...state.deleteChannelModal,
      isInputValid,
    },
  }),
  [actions.showNewChannelModal]: state => ({ ...state, newChannelModal: { show: true } }),
  [actions.hideNewChannelModal]: state => ({ ...state, newChannelModal: { show: false } }),
}, initState.ui);

export default combineReducers({
  currentChannelId,
  messages,
  channels,
  currentUsername,
  msgRequestStatus,
  newChannelRequestStatus,
  ui,
  form: formReducer,
});
