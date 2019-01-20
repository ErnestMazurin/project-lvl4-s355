import axios from 'axios/index';
import { createAction } from 'redux-actions';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> int,
  content -> string
}
 */

export const newMessage = createAction('TASK_NEW_MESSAGE');
export const newMessageFailure = createAction('TASK_SEND_NEW_MESSAGE_FAILURE');
export const newMessageSuccess = createAction('TASK_SEND_NEW_MESSAGE_SUCCESS');
export const sendNewMessage = message => async (dispatch) => {
  try {
    const { channelId } = message;
    const url = `/api/v1/channels/${channelId}/messages`;
    console.log(message);
    const request = { data: { attributes: { ...message, date: Date.now() } } };
    await axios.post(url, request);
    dispatch(newMessageSuccess());
  } catch (e) {
    console.log(e);
    dispatch(newMessageFailure());
  }
};
