import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { R6Service } from 'r6-api-caching'
import { Logger } from 'tslog'
import { container } from 'tsyringe'

import { formatMessage } from '../utils'

const logger = container.resolve(Logger)
const r6Service = container.resolve(R6Service)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Show server status'),
  async execute (interaction: CommandInteraction) {
    logger.info(`Get servers status by ${interaction.user.username}`)

    const serverStatus = await r6Service.getServersStatus()

    if (!serverStatus) {
      interaction.reply('could not fetch servers status data !')
      return
    }

    const response = ['Server status :']

    for (const server of serverStatus) {
      const online = server.status === 'Online' ? '🟢' : '🔴'
      response.push(`${online} : ${server.name}`)
    }

    interaction.reply(formatMessage(response))
  }
}
