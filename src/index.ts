import 'reflect-metadata'
import { container } from 'tsyringe'
import { Logger } from 'tslog'
import { Client, GatewayIntentBits, Collection, Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { exit } from 'process'

import { initServices } from './services/services'
import * as fs from 'fs'
import * as path from 'path'

import 'dotenv/config'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, any>
  }
}

async function start () {
  await initServices()

  const logger = container.resolve(Logger)
  const client = new Client({ intents: [GatewayIntentBits.Guilds] })
  client.commands = new Collection()
  const commands = []

  logger.info('Registering commands...')

  const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file))
    logger.info(`Registered command: ${command.data.name}`)
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON())
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    )
    logger.info('Successfully registered application commands !')
  } catch (e) {
    logger.error(`Failed to update application commands: ${e}`)
    exit(1)
  }

  logger.info('Connection...')

  try {
    await client.login(process.env.TOKEN)
    logger.info('Connected !')
  } catch (e) {
    logger.error('Connection error, invalid token.')
    exit(1)
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return
    }
    const command = client.commands.get(interaction.commandName)
    if (!command) {
      return
    }
    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    }
  })
}

start()
