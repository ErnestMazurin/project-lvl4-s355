import axios from 'axios/index';
import { createAction } from 'redux-actions';
import { renameChannelRoute } from '../routes';

export const renameChannel = createAction('TASK_RENAME_CHANNEL');
export const renameChannelFailure = createAction('TASK_RENAME_CHANNEL_FAILURE');
export const renameChannelSuccess = createAction('TASK_RENAME_CHANNEL_SUCCESS');
export const sendRenameChannel = (id, name) => async (dispatch) => {
  try {
    await axios.patch(renameChannelRoute(id), { data: { attributes: { name } } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(renameChannelFailure());
    throw e;
  }
};
