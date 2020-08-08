import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initState = {
  requestStatus: {
    windowType: '',
    status: 'success',
  },
};

export default handleActions(
  {
    [actions.newMessageSuccess]: () => ({ windowType: 'NEW_MESSAGE', status: 'success' }),
    [actions.newMessageFailure]: () => ({ windowType: 'NEW_MESSAGE', status: 'failure' }),

    [actions.newChannelSuccess]: () => ({ windowType: 'NEW_CHANNEL', status: 'success' }),
    [actions.newChannelFailure]: () => ({ windowType: 'NEW_CHANNEL', status: 'failure' }),

    [actions.deleteChannelSuccess]: () => ({ windowType: 'DELETE_CHANNEL', status: 'success' }),
    [actions.deleteChannelFailure]: () => ({ windowType: 'DELETE_CHANNEL', status: 'failure' }),

    [actions.renameChannelSuccess]: () => ({ windowType: 'RENAME_CHANNEL', status: 'success' }),
    [actions.renameChannelFailure]: () => ({ windowType: 'RENAME_CHANNEL', status: 'failure' }),
  },
  initState.requestStatus,
);
