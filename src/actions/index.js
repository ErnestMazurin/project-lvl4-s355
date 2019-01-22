import { createAction } from 'redux-actions';
import * as newChannelModule from './newChannel';
import * as renameChannelModule from './renameChannel';
import * as deleteChannelModule from './deleteChannel';
import * as newMessageModule from './newMessage';
import * as uiModule from './ui';

export const setCurrentUsername = createAction('TASK_SET_CURRENT_USERNAME');

export const {
  newChannel,
  newChannelFailure,
  newChannelSuccess,
  sendNewChannel,
} = newChannelModule;

export const {
  renameChannel,
  renameChannelFailure,
  renameChannelSuccess,
  sendRenameChannel,
} = renameChannelModule;

export const {
  deleteChannel,
  deleteChannelFailure,
  deleteChannelSuccess,
  sendDeleteChannel,
} = deleteChannelModule;

export const {
  newMessage,
  newMessageFailure,
  newMessageSuccess,
  sendNewMessage,
} = newMessageModule;

export const {
  changeChannel,
  showDeleteChannelModal,
  hideDeleteChannelModal,
  showNewChannelModal,
  hideNewChannelModal,
  showRenameChannelModal,
  hideRenameChannelModal,
} = uiModule;
