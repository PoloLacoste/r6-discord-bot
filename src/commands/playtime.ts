import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { Logger } from 'tslog';
const humanizeDuration = require("humanize-duration");

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Playtime {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command("playtime :platform")
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.username);
    
    if (username != null) {
      this.logger.info(`Get playtime on ${platform} for ${command.author.username} with username ${username}`);

      const playtime = await this.r6Service.getPlaytimeByUsername(platform, username);

      command.reply(formatMessage([
        'your playtime :',
        `⏱️ General : ${humanizeDuration(playtime.general * 1000)}`,
        `🎮 Casual : ${humanizeDuration(playtime.casual * 1000)}`,
        `📋 Ranked : ${humanizeDuration(playtime.ranked * 1000)}`,
        `✈️ Discovery : ${humanizeDuration(playtime.discovery * 1000)}`
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}