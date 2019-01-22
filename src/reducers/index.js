import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { messages, channels, currentUsername } from './domain';
import requestStatus from './requests';
import ui from './ui';

export default combineReducers({
  messages,
  channels,
  currentUsername,
  requestStatus,
  ui,
  form: formReducer,
});
