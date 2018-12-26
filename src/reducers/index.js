import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { changeChannel } from '../actions';

const currentChannelId = handleActions({
  [changeChannel]: (state, { payload: { id } }) => {
    return id;
  },
}, 1);

export default combineReducers({ currentChannelId });
