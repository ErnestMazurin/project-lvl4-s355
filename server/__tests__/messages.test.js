import path from 'path';
import request from 'supertest';

import buildApp from '..';

const buildUrl = (url) => path.join('/api/v1/', url);

describe('messages api', () => {
  it('get /channels/:id/messages', async () => {
    const state = {
      channels: [
        { id: 100, name: 'custom', removable: true },
      ],
      messages: [
        { id: 1, channelId: 100, body: 'hey custom' },
      ],
    };
    const app = buildApp(state);
    const { status, body } = await request(app)
      .get(buildUrl('channels/100/messages'))
      .set('Accept', 'application/json');

    expect(status).toBe(200);
    expect(body).toHaveLength(state.messages.length);
    const expected = {
      type: 'messages',
      id: 1,
      attributes: {
        id: 1,
        channelId: 100,
        body: 'hey custom',
      },
    };
    const actualMsg = body[0];

    expect(actualMsg).toMatchObject(expected);
  });
  it('post /channels/:id/messages', async () => {
    const state = {
      channels: [
        { id: 100, name: 'custom', removable: true },
      ],
      messages: [
        { id: 1, channeldId: 100, body: 'hey custom' },
      ],
    };

    const app = buildApp(state);
    const payload = {
      data: {
        attributes: {
          body: 'egegey',
        },
      },
    };

    const { status, body } = await request(app)
      .post(buildUrl('channels/100/messages'))
      .set('Accept', 'application/json')
      .send(payload);

    expect(status).toBe(201);
    const expected = {
      data: {
        type: 'messages',
        attributes: {
          body: 'egegey',
        },
      },
    };

    expect(body).toMatchObject(expected);
  });
});
