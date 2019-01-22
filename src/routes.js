const root = '/api/v1';

export const newMessageRoute = channelId => `${root}/channels/${channelId}/messages`;

export const newChannelRoute = () => `${root}/channels`;

export const renameChannelRoute = id => `${root}/channels/${id}`;

export const deleteChannelRoute = id => `${root}/channels/${id}`;
