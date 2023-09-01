import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { Logger } from 'tslog'
import { container } from 'tsyringe'
import { Platform, R6Service } from 'r6-api-caching'

import { formatMessage } from '../utils'
import { R6UsernameService } from '../services/r6-username.service'
import { humanizer } from 'humanize-duration'

const logger = container.resolve(Logger)
const r6Service = container.resolve(R6Service)
const r6UsernameService = container.resolve(R6UsernameService)
const humanize = humanizer()

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
        `🤖 PVE General : ${humanize(playtime.pve.general * 1000)}`,
        `⏱️ General : ${humanize(playtime.pvp.general * 1000)}`,
        `🎮 Casual : ${humanize(playtime.pvp.casual * 1000)}`,
        `📋 Ranked : ${humanize(playtime.pvp.ranked * 1000)}`,
        `🤝 Custom : ${humanize(playtime.pvp.custom * 1000)}`,
        `✈️ Other : ${humanize(playtime.pvp.other * 1000)}`
      ]))
    } else {
      interaction.editReply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
