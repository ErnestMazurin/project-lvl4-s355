import axios from 'axios/index';
import { createAction } from 'redux-actions';
import { newChannelRoute } from '../routes';

/** channel = {
  id -> int
  name -> string,
  removable -> boolean,
  messages: [...msgIds],
}
 */

export const newChannel = createAction('TASK_NEW_CHANNEL');
export const newChannelFailure = createAction('TASK_SEND_NEW_CHANNEL_FAILURE');
export const newChannelSuccess = createAction('TASK_SEND_NEW_CHANNEL_SUCCESS');
export const sendNewChannel = name => async (dispatch) => {
  try {
    await axios.post(newChannelRoute(), { data: { attributes: { name } } });
    dispatch(newChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(newChannelFailure());
    throw e;
  }
};
