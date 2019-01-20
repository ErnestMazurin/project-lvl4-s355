import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ui from './ui';
import { messages, channels, currentUsername } from './domain';
import {
  newMessageRequestStatus,
  newChannelRequestStatus,
  deleteChannelRequestStatus,
  renameChannelRequestStatus,
} from './requests';

export default combineReducers({
  messages,
  channels,
  currentUsername,
  newMessageRequestStatus,
  newChannelRequestStatus,
  deleteChannelRequestStatus,
  renameChannelRequestStatus,
  ui,
  form: formReducer,
});
