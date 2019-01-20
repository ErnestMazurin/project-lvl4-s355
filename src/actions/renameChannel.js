import axios from 'axios/index';
import { createAction } from 'redux-actions';

export const renameChannel = createAction('TASK_RENAME_CHANNEL');
export const renameChannelFailure = createAction('TASK_RENAME_CHANNEL_FAILURE');
export const renameChannelSuccess = createAction('TASK_RENAME_CHANNEL_SUCCESS');
export const sendRenameChannel = (id, name) => async (dispatch) => {
  try {
    const url = `/api/v1/channels/${id}`;
    const request = { data: { attributes: { name } } };
    await axios.patch(url, request);
    dispatch(renameChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(renameChannelFailure());
  }
};
