/* eslint-disable no-case-declarations */
import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { Logger } from 'tslog'
import { container } from 'tsyringe'

import { R6UsernameService } from '../services/r6-username.service'

const logger = container.resolve(Logger)
const r6UsernameService = container.resolve(R6UsernameService)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Get game level of the current user')
    .addSubcommand(command => command
      .setName('set')
      .setDescription('Link current user with your game account (username)')
      .addStringOption(option => option
        .setName('username')
        .setDescription('Game account username')
        .setRequired(true)))
    .addSubcommand(command => command
      .setName('get')
      .setDescription('Get current user game account username')),
  async execute (interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
      case 'set':
        const userId = interaction.user.id
        const username = interaction.options.getString('username')
        logger.info(`Set r6 username for ${interaction.user.username} with username ${username}`)
        await r6UsernameService.setR6Username(userId, username)
        interaction.reply(`Your Rainbow Six Siege username is now : ${username}.`)
        break
      case 'get':
        const r6Username = await r6UsernameService.getR6Username(interaction.user.id)
        if (r6Username != null) {
          logger.info(`Get r6 username for ${interaction.user.username} with username ${r6Username}`)
          interaction.reply(`Your Rainbow Six Siege username is : ${r6Username}.`)
        } else {
          interaction.reply('You haven\'t set your Rainbow Six Siege username yet !')
        }
        break
      default: interaction.reply('Invalid subcommand, must be "get" or "set"')
    }
  }
}
