import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { Logger } from 'tslog'
import { container } from 'tsyringe'
import { Platform, R6Service } from 'r6-api-caching'
import humanizeDuration = require('humanize-duration')

import { formatMessage } from '../utils'
import { R6UsernameService } from '../services/r6-username.service'

const logger = container.resolve(Logger)
const r6Service = container.resolve(R6Service)
const r6UsernameService = container.resolve(R6UsernameService)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playtime')
    .setDescription('Get game playtime of the current user')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Account platform (uplay, xbl or psn), default "uplay"')),
  async execute (interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const platform = interaction.options.getString('platform') || 'uplay'
    const username = await r6UsernameService.getR6Username(interaction.user.id)

    if (username != null) {
      logger.info(`Get playtime on ${platform} for ${interaction.user.username} with username ${username}`)

      const playtime = await r6Service.getPlaytimeByUsername(platform as Platform, username)

      if (!playtime) {
        interaction.editReply('There is no playtime data with your username !')
        return
      }

      interaction.editReply(formatMessage([
        'Your playtime :',
        `🤖 PVE General : ${humanizeDuration(playtime.pve.general * 1000)}`,
        `⏱️ General : ${humanizeDuration(playtime.pvp.general * 1000)}`,
        `🎮 Casual : ${humanizeDuration(playtime.pvp.casual * 1000)}`,
        `📋 Ranked : ${humanizeDuration(playtime.pvp.ranked * 1000)}`,
        `🤝 Custom : ${humanizeDuration(playtime.pvp.custom * 1000)}`,
        `✈️ Other : ${humanizeDuration(playtime.pvp.other * 1000)}`
      ]))
    } else {
      interaction.editReply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
