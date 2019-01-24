import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { messages, channels } from './domain';
import requestStatus from './requests';
import ui from './ui';

export default combineReducers({
  messages,
  channels,
  requestStatus,
  ui,
  form: formReducer,
});
