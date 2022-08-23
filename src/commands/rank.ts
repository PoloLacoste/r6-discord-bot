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
    .setName('rank')
    .setDescription('Get game rank of the current user')
    .addStringOption(option => option
      .setName('season')
      .setDescription('Season number (default is last)'))
    .addStringOption(option => option
      .setName('region')
      .setDescription('Account region (emea, ncsa, apac), default "emea"'))
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Account platform (uplay, xbl or psn), default "uplay"')),
  async execute (interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const regionId = interaction.options.getString('region') || 'emea'
    const platform = interaction.options.getString('platform') || 'uplay'
    const username = await r6UsernameService.getR6Username(interaction.user.id)

    let seasonId = interaction.options.getString('season') || -1
    const getLastSeason = seasonId === -1

    if (username != null) {
      const seasonText = getLastSeason ? 'latest season' : `season ${seasonId}`
      logger.info(`Get ${seasonText} on ${platform} for ${interaction.user.username} with username ${username}`)

      const rank = await r6Service.getRankByUsername(platform as Platform, username)

      if (!rank) {
        interaction.editReply('There is no rank data with your username !')
        return
      }

      // if there a no specified season id
      // get the last one
      if (getLastSeason) {
        const seasonIds = Object.keys(rank.seasons)
        seasonId = seasonIds[seasonIds.length - 1]
      }
      const season = rank.seasons[seasonId]
      if (!season) {
        interaction.editReply('There is no rank data for this season with your username !')
        return
      }

      const region = season.regions[regionId]
      if (!region) {
        interaction.editReply('There is no rank data for this season and region with your username !')
        return
      }

      const boards = region.boards
      const board = boards[Object.keys(boards)[0]]

      interaction.editReply(formatMessage([
        'Your rank :',
        `Season : ${season.seasonName}`,
        `💀 Kills : ${board.kills}`,
        `☠️ Deaths : ${board.deaths}`,
        `🏆 Wins : ${board.wins}`,
        `😭 Losses : ${board.losses}`,
        `📘 MMR : ${board.current.mmr}`
      ]))
    } else {
      interaction.editReply('You haven\'t set your Rainbow Six Siege username yet !')
    }
  }
}
