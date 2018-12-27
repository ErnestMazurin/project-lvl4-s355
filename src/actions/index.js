import { createAction } from 'redux-actions';

/** message = {
  id -> int,
  channelId -> int,
  author -> string,
  date -> string,
  content -> string
}
 */

export const changeChannel = createAction('CHANGE_CHANNEL_TASK');

export const addMessage = createAction('ADD_MESSAGE_TASK', ({ message }) => {
  const id = 15;
  const date = 'today';
  return { message: { ...message, id, date } };
});
