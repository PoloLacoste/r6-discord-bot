import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { Logger } from 'tslog';

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Stats {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command("stats :platform")
  async stats(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.username);

    if (username != null) {
      this.logger.info(`Get stats on ${platform} for ${command.author.username} with username ${username}`);

      const stats = await this.r6Service.getStatsByUsername(platform, username);
      const general = stats.pvp.general;

      command.reply(formatMessage([
        'your stats :',
        `💀 Kills : ${general.kills}`,
        `🔪 Melee kills : ${general.meleeKills}`,
        `☠️ Deaths : ${general.deaths}`,
        `🤝 Assists : ${general.assists}`,
        `🎯 Headshots : ${general.headshots}`,
        `🏆 Wins : ${general.wins}`,
        `😭 Losses : ${general.losses}`,
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}