import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const initState = {
  currentUsername: '',
  messages: {
    byId: {},
    allIds: [],
  },
  channels: {
    byId: {},
    allIds: [],
  },
};

export const currentUsername = handleActions({
  [actions.setCurrentUsername]: (state, { payload: { username } }) => username,
}, initState.currentUsername);


export const messages = handleActions({

  [actions.newMessage]: ({ byId, allIds }, { payload: { id, attributes } }) => ({
    byId: { ...byId, [id]: attributes },
    allIds: [id, ...allIds],
  }),

  [actions.deleteChannel]: ({ byId, allIds }, { payload: { id } }) => {
    const newMessages = _.omitBy(byId, msg => msg.channelId === id);
    return {
      byId: newMessages,
      allIds: allIds.filter(identifier => _.has(newMessages, identifier)),
    };
  },

}, initState.messages);


export const channels = handleActions({

  [actions.newMessage]: ({ byId, allIds }, { payload: { id, attributes } }) => {
    const { channelId } = attributes;
    const channel = byId[channelId];
    const newChannel = { ...channel, messages: [id, ...channel.messages] };
    return ({
      byId: { ...byId, [channelId]: newChannel },
      allIds,
    });
  },

  [actions.newChannel]: ({ byId, allIds }, { payload: { id, attributes } }) => (
    {
      byId: { ...byId, [id]: { ...attributes, messages: [] } },
      allIds: [...allIds, id],
    }),

  [actions.deleteChannel]: ({ byId, allIds }, { payload: { id } }) => (
    {
      byId: _.omit(byId, id),
      allIds: allIds.filter(index => index !== id),
    }),

  [actions.renameChannel]: ({ byId, allIds }, { payload: { id, attributes: { name } } }) => {
    const newChannel = { ...byId[id], name };
    return {
      byId: { ...byId, [id]: newChannel },
      allIds,
    };
  },

}, initState.channels);
