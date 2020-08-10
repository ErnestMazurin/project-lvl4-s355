/* eslint-disable no-console */

import axios from 'axios';
import createAction from 'redux-actions/es/createAction';
import * as routes from '../routes';

export const newChannel = createAction('TASK_NEW_CHANNEL');
export const newChannelFailure = createAction('TASK_SEND_NEW_CHANNEL_FAILURE');
export const newChannelSuccess = createAction('TASK_SEND_NEW_CHANNEL_SUCCESS');
export const sendNewChannel = (name) => async (dispatch) => {
  try {
    await axios.post(routes.newChannel(), { channel: { name } });
    dispatch(newChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(newChannelFailure());
    throw e;
  }
};

export const renameChannel = createAction('TASK_RENAME_CHANNEL');
export const renameChannelFailure = createAction('TASK_RENAME_CHANNEL_FAILURE');
export const renameChannelSuccess = createAction('TASK_RENAME_CHANNEL_SUCCESS');
export const sendRenameChannel = (id, name) => async (dispatch) => {
  try {
    await axios.patch(routes.renameChannel(id), { channel: { name } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const deleteChannel = createAction('TASK_DELETE_CHANNEL');
export const deleteChannelFailure = createAction('TASK_DELETE_CHANNEL_FAILURE');
export const deleteChannelSuccess = createAction('TASK_DELETE_CHANNEL_SUCCESS');
export const sendDeleteChannel = (id) => async (dispatch) => {
  try {
    await axios.delete(routes.deleteChannel(id));
    dispatch(deleteChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const newMessage = createAction('TASK_NEW_MESSAGE');
export const newMessageFailure = createAction('TASK_SEND_NEW_MESSAGE_FAILURE');
export const newMessageSuccess = createAction('TASK_SEND_NEW_MESSAGE_SUCCESS');
export const sendNewMessage = (message) => async (dispatch) => {
  try {
    const { channelId } = message;
    const request = { message: { ...message, date: Date.now() } };
    await axios.post(routes.newMessage(channelId), request);
    dispatch(newMessageSuccess());
  } catch (e) {
    console.log(e);
    dispatch(newMessageFailure());
    throw e;
  }
};

export const changeChannel = createAction('TASK_CHANGE_CHANNEL');
export const showDeleteChannelModal = createAction('TASK_SHOW_DELETE_CHANNEL_MODAL');
export const hideDeleteChannelModal = createAction('TASK_HIDE_DELETE_CHANNEL_MODAL');
export const showNewChannelModal = createAction('TASK_SHOW_NEW_CHANNEL_MODAL');
export const hideNewChannelModal = createAction('TASK_HIDE_NEW_CHANNEL_MODAL');
export const showRenameChannelModal = createAction('TASK_SHOW_RENAME_CHANNEL_MODAL');
export const hideRenameChannelModal = createAction('TASK_HIDE_RENAME_CHANNEL_MODAL');
