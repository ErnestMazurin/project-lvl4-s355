import path from 'path';
import request from 'supertest';

import buildApp from '..';

const buildUrl = (url) => path.join('/api/v1/', url);

describe('channels api', () => {
  it('get /channels', async () => {
    const app = buildApp();
    const expectedGeneral = { name: 'general', removable: false };
    const expectedRandom = { name: 'random', removable: false };

    const { status, body } = await request(app)
      .get(buildUrl('channels'))
      .set('Accept', 'application/json');

    expect(status).toBe(301);
    expect(body).toHaveLength(2);
    const [general, random] = body;

    expect(general).toMatchObject(expectedGeneral);
    expect(random).toMatchObject(expectedRandom);
  });
  it('post /channels', async () => {
    const app = buildApp();
    const payload = { data: { attributes: { name: 'custom' } } };
    const { status, body } = await request(app)
      .post(buildUrl('channels'))
      .send(payload)
      .set('Accept', 'application/json');

    expect(status).toBe(201);
    const expected = {
      data: {
        attributes: {
          name: payload.data.attributes.name,
          removable: true,
        },
      },
    };
    expect(body).toMatchObject(expected);
  });

  it('delete /channels/:id', async () => {
    const state = { channels: [{ id: 100, name: 'custom', removable: true }] };
    const app = buildApp(state);

    const { status } = await request(app)
      .delete(buildUrl('channels/100'))
      .set('Accept', 'application/json');

    expect(status).toEqual(204);
  });

  it('patch /channels/:id', async () => {
    const state = {
      channels: [
        { id: 100, name: 'custom', removable: true },
      ],
    };

    const app = buildApp(state);

    const payload = {
      data: {
        attributes: {
          name: 'zazaza',
        },
      },
    };
    const { status } = await request(app)
      .patch(buildUrl('channels/100'))
      .send(payload)
      .set('Accept', 'application/json');

    expect(status).toEqual(204);
  });
});
