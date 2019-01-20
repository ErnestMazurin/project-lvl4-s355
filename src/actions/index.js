import { createAction } from 'redux-actions';
import * as deleteChannelModule from './deleteChannel';
import * as newChannelModule from './newChannel';
import * as newMessageModule from './newMessage';
import * as uiModule from './ui';

export const setCurrentUsername = createAction('TASK_SET_CURRENT_USERNAME');

export const {
  newMessage,
  newMessageFailure,
  newMessageSuccess,
  sendNewMessage,
} = newMessageModule;

export const {
  deleteChannel,
  deleteChannelFailure,
  deleteChannelSuccess,
  sendDeleteChannel,
} = deleteChannelModule;

export const {
  newChannel,
  newChannelFailure,
  newChannelSuccess,
  sendNewChannel,
} = newChannelModule;

export const {
  changeChannel,
  showDeleteChannelModal,
  hideDeleteChannelModal,
  validateDeleteChannelModal,
  showNewChannelModal,
  hideNewChannelModal,
} = uiModule;
