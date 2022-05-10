import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { Platform, R6Service } from 'r6-api-caching'
import { Logger } from 'tslog'
import { container } from 'tsyringe'

import { R6UsernameService } from '../services/r6-username.service'

const logger = container.resolve(Logger)
const r6Service = container.resolve(R6Service)
const r6UsernameService = container.resolve(R6UsernameService)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('id')
    .setDescription('Get game id of the current user')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Account platform (uplay, xbl or psn), default "uplay"')),
  async execute (interaction: CommandInteraction) {
    const platform = interaction.options.getString('platform') || 'uplay'
    const username = await r6UsernameService.getR6Username(interaction.user.id)

    if (username != null) {
      logger.info(`Get id on ${platform} for ${interaction.user.username} with username ${username}`)

      const id = await r6Service.getId(platform as Platform, username)

      if (!id) {
        interaction.reply('Could not find your Rainbow Six Siege id !')
      }

      interaction.reply(`Your Rainbow Six Siege id is : ${id}`)
    } else {
      interaction.reply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
