import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { Logger } from 'tslog';

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Rank {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  private static readonly lastSeason = "21";

  @Command("rank :season :platform")
  async rank(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.id);

    const seasonId = command.args.season || Rank.lastSeason;
    
    if (username != null) {
      this.logger.info(`Get season ${seasonId} on ${platform} for ${command.author.username} with username ${username}`);

      const rank = await this.r6Service.getRankByUsername(platform, username);
      const season = rank.seasons[seasonId];
      const region = season.regions.emea;

      command.reply(formatMessage([
        'your rank :',
        `Season : ${season.name}`,
        `💀 Kills : ${region.kills}`,
        `☠️ Deaths : ${region.deaths}`,
        `🏆 Wins : ${region.wins}`,
        `😭 Losses : ${region.losses}`,
        `📘 MMR : ${region.current.mmr}`
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}
