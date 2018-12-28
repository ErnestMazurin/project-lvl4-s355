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

export const sendMessageRequest = createAction('TASK_SEND_MESSAGE_REQUEST');
export const sendMessageFailure = createAction('TASK_SEND_MESSAGE_FAILURE');
export const sendMessageSuccess = createAction('TASK_SEND_MESSAGE_SUCCESS');

export const sendMessage = (channelId, message) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = `/channel/${channelId}/messages}`;
    const request = { data: { attributes: { ...message, date: Date.now() } } };
    console.log(url);
    console.log(request);
    const { data: { id, attributes } } = axios.post(url, request);
    dispatch(sendMessageSuccess({ id, attributes }));
  } catch (e) {
    console.log(e);
    dispatch(sendMessageFailure());
  }
};
