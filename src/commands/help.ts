import { Command, CommandMessage } from '@typeit/discord';
import { Logger } from 'tslog';
import { container } from 'tsyringe';

export abstract class Help {

  private readonly logger = container.resolve(Logger);

  @Command('help')
  async help(command: CommandMessage) {
    this.logger.info(`Sent help message to ${command.author.username}`);

    command.author.send({
      embed: {
        title: 'R6 Discord bot',
        url: 'https://github.com/PoloLacoste/r6-discord-bot',
        description: 'R6 Discord bot is a simple bot used to display some analytics about your Rainbow Six Siege account',
        fields: [
          {
            name: 'Commands',
            value: 'Full list of commands is available [here](https://github.com/PoloLacoste/r6-discord-bot#%EF%B8%8F-bot-commands)'
          },
          {
            name: 'Support',
            value: '[Click here](https://github.com/PoloLacoste/r6-discord-bot) to discuss with the creator of the bot'
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'R6 Discord bot'
        }
      }
    });
  }
}