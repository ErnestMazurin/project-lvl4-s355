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

const sortByDate = messages => _.reverse(_.sortedUniqBy(messages, msg => msg.date));

export const currentUsername = handleActions({
  [actions.setCurrentUsername]: (state, { payload: { username } }) => username,
}, initState.currentUsername);


export const messages = handleActions({

  [actions.newMessage]: ({ byId }, { payload: { id, attributes } }) => {
    const newMessages = { ...byId, [id]: attributes };
    return {
      byId: newMessages,
      allIds: sortByDate(_.values(newMessages)).map(msg => msg.id),
    };
  },

  [actions.deleteChannel]: ({ byId }, { payload: { id } }) => {
    const newMessages = _.omitBy(byId, msg => msg.channelId === id);
    return {
      byId: newMessages,
      allIds: sortByDate(_.values(newMessages)).map(msg => msg.id),
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

}, initState.channels);
