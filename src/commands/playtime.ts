import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { Logger } from 'tslog';
const humanizeDuration = require('humanize-duration');

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Playtime {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command('playtime :platform')
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.id);
    
    if (username != null) {
      this.logger.info(`Get playtime on ${platform} for ${command.author.username} with username ${username}`);

      const playtime = await this.r6Service.getPlaytimeByUsername(platform, username);

      command.reply(formatMessage([
        'your playtime :',
        `🤖 PVE General : ${humanizeDuration(playtime.pve.general * 1000)}`,
        `⏱️ General : ${humanizeDuration(playtime.pvp.general * 1000)}`,
        `🎮 Casual : ${humanizeDuration(playtime.pvp.casual * 1000)}`,
        `📋 Ranked : ${humanizeDuration(playtime.pvp.ranked * 1000)}`,
        `🤝 Custom : ${humanizeDuration(playtime.pvp.custom * 1000)}`,
        `✈️ Other : ${humanizeDuration(playtime.pvp.other * 1000)}`
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}