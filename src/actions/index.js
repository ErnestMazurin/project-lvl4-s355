import { createAction } from 'redux-actions';
import axios from 'axios';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> int,
  content -> string
}
 */

/** channel = {
  id -> int
  name -> string,
  removable -> boolean,
  messages: [...msgIds],
}
 */

export const setCurrentUsername = createAction('TASK_SET_CURRENT_USERNAME');
export const changeChannel = createAction('TASK_CHANGE_CHANNEL');

export const newMessage = createAction('TASK_NEW_MESSAGE');
export const sendNewMessageFailure = createAction('TASK_SEND_NEW_MESSAGE_FAILURE');
export const sendNewMessageSuccess = createAction('TASK_SEND_NEW_MESSAGE_SUCCESS');
export const sendNewMessage = message => async (dispatch) => {
  try {
    const { channelId } = message;
    const url = `/api/v1/channels/${channelId}/messages`;
    console.log(message);
    const request = { data: { attributes: { ...message, date: Date.now() } } };
    await axios.post(url, request);
    dispatch(sendNewMessageSuccess());
  } catch (e) {
    console.log(e);
    dispatch(sendNewMessageFailure());
  }
};

export const newChannel = createAction('TASK_NEW_CHANNEL');

export const sendNewChannelFailure = createAction('TASK_SEND_NEW_CHANNEL_FAILURE');
export const sendNewChannelSuccess = createAction('TASK_SEND_NEW_CHANNEL_SUCCESS');
export const sendNewChannel = name => async (dispatch) => {
  try {
    const url = '/api/v1/channels';
    const request = { data: { attributes: { name } } };
    await axios.post(url, request);
    dispatch(sendNewChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(sendNewChannelFailure());
  }
};

export const deleteChannel = createAction('TASK_DELETE_CHANNEL');
export const deleteChannelFailure = createAction('TASK_DELETE_CHANNEL_FAILURE');
export const deleteChannelSuccess = createAction('TASK_DELETE_CHANNEL_SUCCESS');
export const sendDeleteChannel = id => async (dispatch) => {
  try {
    const url = `/api/v1/channels/${id}`;
    await axios.delete(url);
    dispatch(deleteChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(deleteChannelFailure());
  }
};

export const showDeleteChannelModal = createAction('TASK_SHOW_DELETE_CHANNEL_MODAL');
export const hideDeleteChannelModal = createAction('TASK_HIDE_DELETE_CHANNEL_MODAL');
export const validateDeleteChannelModal = createAction('TASK_VALIDATE_DELETE_CHANNEL_MODAL',
  ({ channelName, input }) => ({ isInputValid: channelName === input }));

export const showNewChannelModal = createAction('TASK_SHOW_NEW_CHANNEL_MODAL');
export const hideNewChannelModal = createAction('TASK_HIDE_NEW_CHANNEL_MODAL');
