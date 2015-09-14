'use strict';
import path from 'path';

import express from 'express';
import log4js from 'log4js';

import logger from './logger';

let app = express();
var BASE_DIR = path.dirname(__dirname);
app.set('views', path.join(BASE_DIR, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(BASE_DIR, 'public')));
app.use(log4js.connectLogger(logger));

app.get('/', function(req, res) {
  res.render('test');
});

var server = app.listen('3000', 'localhost', function(err) {
  if (err) throw new Error(err);

  let host = this.address();
  logger.info(`[SERVER] Started on ${host.address}:${host.port}`);
});

module.exports = app;