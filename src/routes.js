const root = '/api/v1';

const newMessage = (channelId) => `${root}/channels/${channelId}/messages`;
const newChannel = () => `${root}/channels`;
const renameChannel = (id) => `${root}/channels/${id}`;
const deleteChannel = (id) => `${root}/channels/${id}`;

export default {
  newMessage,
  newChannel,
  renameChannel,
  deleteChannel,
};
