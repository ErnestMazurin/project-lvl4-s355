import request from 'supertest';
import { JSDOM } from 'jsdom';

import buildApp from '..';

test('should contain root div', async () => {
  const appState = {
    channels: [{
      id: 100,
      name: 'custom',
      removable: true,
    }],
    messages: [],
    currentChannelId: 100,
  };
  const app = buildApp(appState);

  const { status, text } = await request(app).get('/');
  expect(status).toBe(200);

  const dom = new JSDOM(text);
  const chat = dom.window.document.getElementById('chat');
  expect(chat.tagName).toBe('DIV');
});
