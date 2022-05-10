import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
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
    .setName('stats')
    .setDescription('Get game statistics of the current user')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Account platform (uplay, xbl or psn), default "uplay"')),
  async execute (interaction: CommandInteraction) {
    const platform = interaction.options.getString('platform') || 'uplay'
    const username = await r6UsernameService.getR6Username(interaction.user.id)

    if (username != null) {
      logger.info(`Get stats on ${platform} for ${interaction.user.username} with username ${username}`)

      const stats = await r6Service.getStatsByUsername(platform as Platform, username)

      if (!stats) {
        interaction.reply('There is no stats data with your username !')
        return
      }

      const general = stats.pvp.general

      interaction.reply(formatMessage([
        'Your stats :',
        `💀 Kills : ${general.kills}`,
        `🔪 Melee kills : ${general.meleeKills}`,
        `☠️ Deaths : ${general.deaths}`,
        `🤝 Assists : ${general.assists}`,
        `🎯 Headshots : ${general.headshots}`,
        `🏆 Wins : ${general.wins}`,
        `😭 Losses : ${general.losses}`
      ]))
    } else {
      interaction.reply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
