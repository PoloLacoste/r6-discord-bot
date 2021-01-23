import "reflect-metadata";
import { Client } from "@typeit/discord";
import { initServices } from "./services/services";

require('dotenv').config()

initServices()

async function start() {
  const client = new Client({
    classes: [
      `${__dirname}/discord/*.ts`,
      `${__dirname}/discord/*.js`
    ],
    silent: false,
    variablesChar: ":"
  });

  await client.login(process.env.TOKEN);
}

start();