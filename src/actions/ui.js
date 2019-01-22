import { createAction } from 'redux-actions';

export const changeChannel = createAction('TASK_CHANGE_CHANNEL');

export const showDeleteChannelModal = createAction('TASK_SHOW_DELETE_CHANNEL_MODAL');
export const hideDeleteChannelModal = createAction('TASK_HIDE_DELETE_CHANNEL_MODAL');


export const showNewChannelModal = createAction('TASK_SHOW_NEW_CHANNEL_MODAL');
export const hideNewChannelModal = createAction('TASK_HIDE_NEW_CHANNEL_MODAL');


export const showRenameChannelModal = createAction('TASK_SHOW_RENAME_CHANNEL_MODAL');
export const hideRenameChannelModal = createAction('TASK_HIDE_RENAME_CHANNEL_MODAL');