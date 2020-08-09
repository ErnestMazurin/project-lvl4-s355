const root = '/api/v1';

export const newMessage = (channelId) => `${root}/channels/${channelId}/messages`;
export const newChannel = () => `${root}/channels`;
export const renameChannel = (id) => `${root}/channels/${id}`;
export const deleteChannel = (id) => `${root}/channels/${id}`;
