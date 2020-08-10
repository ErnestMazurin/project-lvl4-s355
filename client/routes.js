let root = '/api/v1';

if (process.env.NODE_ENV !== 'production') {
  root = `http://localhost:8080${root}`;
}

export const newMessage = (channelId) => `${root}/channels/${channelId}/messages`;
export const newChannel = () => `${root}/channels`;
export const renameChannel = (id) => `${root}/channels/${id}`;
export const deleteChannel = (id) => `${root}/channels/${id}`;
