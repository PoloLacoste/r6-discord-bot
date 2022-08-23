import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { Logger } from 'tslog'
import { container } from 'tsyringe'

const logger = container.resolve(Logger)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display a simple help message'),
  async execute (interaction: ChatInputCommandInteraction) {
    logger.info(`Sent help message to ${interaction.user.username}`)

    const embed = new EmbedBuilder()
      .setTitle('R6 Discord bot')
      .setURL('https://github.com/PoloLacoste/r6-discord-bot')
      .setDescription('R6 Discord bot is a simple bot used to display some analytics about your Rainbow Six Siege account')
      .addFields(
        {
          name: 'Commands',
          value: 'Full list of commands is available [here](https://github.com/PoloLacoste/r6-discord-bot#%EF%B8%8F-bot-commands)',
        },
        {
          name: 'Support',
          value: '[Click here](https://github.com/PoloLacoste/r6-discord-bot) to discuss with the creator of the bot',
        },
      )
      .setTimestamp()
      .setFooter({
        text: 'R6 Discord bot'
      })

    interaction.reply({
      embeds: [
        embed
      ]
    })
  }
}
