import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ui from './ui';
import { newMessageRequestStatus, newChannelRequestStatus, deleteChannelRequestStatus } from './requests';
import { messages, channels, currentUsername } from './domain';


export default combineReducers({
  messages,
  channels,
  currentUsername,
  newMessageRequestStatus,
  newChannelRequestStatus,
  deleteChannelRequestStatus,
  ui,
  form: formReducer,
});
