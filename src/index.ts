import 'reflect-metadata';
import { container } from 'tsyringe';
import { Client } from '@typeit/discord';
import { Logger } from 'tslog';

require('dotenv').config();

import { initServices } from './services/services';
import { exit } from 'process';

initServices();

async function start() {
  const logger = container.resolve(Logger);
  const client = new Client({
    classes: [
      `${__dirname}/discord/*.ts`,
      `${__dirname}/discord/*.js`
    ],
    silent: false,
    variablesChar: ':'
  });

  logger.info('Connection...');

  try {
    await client.login(process.env.TOKEN);
    logger.info('Connected !');
  }
  catch(e) {
    logger.error('Connection error, invalid token.');
    exit(1);
  }
}

start();