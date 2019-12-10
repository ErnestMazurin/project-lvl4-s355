/* eslint-disable no-console */

import path from 'path';
import Koa from 'koa';
import Pug from 'koa-pug';
import socket from 'socket.io';
import http from 'http';
import mount from 'koa-mount';
import serve from 'koa-static';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import _ from 'lodash';
import addRoutes from './routes';

import 'regenerator-runtime/runtime';

import webpackConfig from '../webpack.config';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default (defaultState) => {
  const app = new Koa();
  app.keys = ['some secret hurr'];
  app.use(bodyParser());
  if (isDevelopment) {
    koaWebpack({
      config: webpackConfig,
    }).then((middleware) => {
      app.use(middleware);
    });
    app.use(koaLogger());
  } else {
    const urlPrefix = '/assets';
    const assetsPath = path.resolve(`${__dirname}/../dist`);
    app.use(mount(urlPrefix, serve(assetsPath)));
  }

  const router = new Router();


  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
    locals: [],
    cache: isProduction,
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);

  const server = http.createServer(app.callback());
  const io = socket(server);

  addRoutes(router, io, defaultState);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return server;
};
