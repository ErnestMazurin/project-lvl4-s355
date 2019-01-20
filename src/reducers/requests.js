import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initState = {
  msgRequestStatus: 'success',
  newChannelRequestStatus: 'success',
};

export const msgRequestStatus = handleActions({
  [actions.sendNewMessageSuccess]: () => 'success',
  [actions.sendNewMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);


export const newChannelRequestStatus = handleActions({
  [actions.sendNewChannelSuccess]: () => 'success',
  [actions.sendNewChannelFailure]: () => 'failure',
}, initState.newChannelRequestStatus);
