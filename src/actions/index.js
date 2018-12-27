import { createAction } from 'redux-actions';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */

export const changeChannel = createAction('TASK_CHANGE_CHANNEL');

export const addMessage = createAction('TASK_ADD_MESSAGE');

export const sendMessageRequest = createAction('TASK_SEND_MESSAGE_REQUEST');

export const sendMessageSuccess = createAction('TASK_SEND_MESSAGE_SUCCESS');

export const sendMessageFailure = createAction('TASK_SEND_MESSAGE_FAILURE');

export const sendMessage = message => (dispatch) => {

};
