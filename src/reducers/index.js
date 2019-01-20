import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ui from './ui';
import { msgRequestStatus, newChannelRequestStatus } from './requests';
import { messages, channels, currentUsername } from './domain';


export default combineReducers({
  messages,
  channels,
  currentUsername,
  msgRequestStatus,
  newChannelRequestStatus,
  ui,
  form: formReducer,
});
