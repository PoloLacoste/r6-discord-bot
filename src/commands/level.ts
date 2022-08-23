import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { Platform, R6Service } from 'r6-api-caching'
import { Logger } from 'tslog'
import { container } from 'tsyringe'
import { R6UsernameService } from '../services/r6-username.service'

import { formatMessage } from '../utils'

const logger = container.resolve(Logger)
const r6Service = container.resolve(R6Service)
const r6UsernameService = container.resolve(R6UsernameService)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Get game level of the current user')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Account platform (uplay, xbl or psn), default "uplay"')),
  async execute (interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const platform = interaction.options.getString('platform') || 'uplay'
    const username = await r6UsernameService.getR6Username(interaction.user.id)

    if (username != null) {
      logger.info(`Get level on ${platform} for ${interaction.user.username} with username ${username}`)

      const level = await r6Service.getLevelByUsername(platform as Platform, username)

      if (!level) {
        interaction.editReply('There is no level data with your username !')
        return
      }

      interaction.editReply(formatMessage([
        'Your level :',
        `⭐ Level : ${level.level}`,
        `📦 LootBox : ${level.lootboxProbability.percent}`
      ]))
    } else {
      interaction.editReply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
