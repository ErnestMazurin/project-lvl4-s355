import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initState = {
  currentChannelId: 1,
  deleteChannelModal: {
    show: false,
    channelName: undefined,
    channelId: undefined,
    isInputValid: true,
  },
  newChannelModal: {
    show: false,
  },
  renameChannelModal: {
    show: false,
    channelId: undefined,
  },
};

export default handleActions({
  [actions.changeChannel]: (state, { payload: { id } }) => ({ ...state, currentChannelId: id }),

  [actions.showDeleteChannelModal]: (state, { payload: { id, name } }) => ({
    ...state,
    deleteChannelModal: {
      isInputValid: true,
      show: true,
      channelName: name,
      channelId: id,
    },
  }),

  [actions.hideDeleteChannelModal]: state => ({
    ...state,
    deleteChannelModal: {
      isInputValid: true,
      show: false,
      channelName: undefined,
      channelId: undefined,
    },
  }),

  [actions.validateDeleteChannelModal]: (state, { payload: { isInputValid } }) => ({
    ...state,
    deleteChannelModal: {
      ...state.deleteChannelModal,
      isInputValid,
    },
  }),

  [actions.showNewChannelModal]: state => ({ ...state, newChannelModal: { show: true } }),
  [actions.hideNewChannelModal]: state => ({ ...state, newChannelModal: { show: false } }),

  [actions.showRenameChannelModal]: (state, { payload: { id } }) => ({
    ...state,
    renameChannelModal: {
      show: true,
      channelId: id,
    },
  }),

  [actions.hideRenameChannelModal]: state => ({ ...state, renameChannelModal: { ...state.renameChannelModal, show: false } }),

}, initState);
