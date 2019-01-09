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
}
 */

export const changeChannel = createAction('TASK_CHANGE_CHANNEL');
export const addMessage = createAction('TASK_ADD_MESSAGE', ({ id, attributes }) => ({ [id]: attributes }));
export const addChannel = createAction('TASK_ADD_CHANNEL', ({ attributes }) => attributes);

export const sendMessageFailure = createAction('TASK_SEND_MESSAGE_FAILURE');
export const sendMessageSuccess = createAction('TASK_SEND_MESSAGE_SUCCESS');

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

export const sendMessage = (channelId, message) => async (dispatch) => {
  try {
    const url = `/api/v1/channels/${channelId}/messages`;
    const request = { data: { attributes: { ...message, date: Date.now() } } };
    await axios.post(url, request);
    dispatch(sendMessageSuccess());
  } catch (e) {
    console.log(e);
    dispatch(sendMessageFailure());
  }
};
