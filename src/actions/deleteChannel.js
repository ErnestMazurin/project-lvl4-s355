import axios from 'axios/index';
import { createAction } from 'redux-actions';

/** channel = {
  id -> int
  name -> string,
  removable -> boolean,
  messages: [...msgIds],
}
 */

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