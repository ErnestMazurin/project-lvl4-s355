import axios from 'axios/index';
import { createAction } from 'redux-actions';
import { deleteChannelRoute } from '../routes';

export const deleteChannel = createAction('TASK_DELETE_CHANNEL');
export const deleteChannelFailure = createAction('TASK_DELETE_CHANNEL_FAILURE');
export const deleteChannelSuccess = createAction('TASK_DELETE_CHANNEL_SUCCESS');
export const sendDeleteChannel = id => async (dispatch) => {
  try {
    await axios.delete(deleteChannelRoute(id));
    dispatch(deleteChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(deleteChannelFailure());
    throw e;
  }
};
