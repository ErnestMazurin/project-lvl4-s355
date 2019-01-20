import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initState = {
  msgRequestStatus: 'success',
  newChannelRequestStatus: 'success',
  deleteChannelRequestStatus: 'success',
};


export const newMessageRequestStatus = handleActions({
  [actions.newMessageSuccess]: () => 'success',
  [actions.newMessageFailure]: () => 'failure',
}, initState.msgRequestStatus);


export const newChannelRequestStatus = handleActions({
  [actions.newChannelSuccess]: () => 'success',
  [actions.newChannelFailure]: () => 'failure',
}, initState.newChannelRequestStatus);


export const deleteChannelRequestStatus = handleActions({
  [actions.deleteChannelSuccess]: () => 'success',
  [actions.deleteChannelFailure]: () => 'failure',
}, initState.deleteChannelRequestStatus);
