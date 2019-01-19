import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ui from './ui';
import {
  messages,
  channels,
  currentUsername,
  msgRequestStatus,
  newChannelRequestStatus,
} from './data';


export default combineReducers({
  messages,
  channels,
  currentUsername,
  msgRequestStatus,
  newChannelRequestStatus,
  ui,
  form: formReducer,
});
