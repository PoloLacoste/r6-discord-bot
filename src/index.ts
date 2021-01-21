import { Client } from "@typeit/discord";

require('dotenv').config()

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