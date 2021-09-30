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

  @Command('rank :season :region :platform')
  async rank(command: CommandMessage) {

    const regionId = command.args.region || 'emea';
    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.id);

    let seasonId = command.args.season || -1;
    const getLastSeason = seasonId === -1;
    
    if (username != null) {
      const seasonText = getLastSeason ? 'latest season' : `season ${seasonId}`;
      this.logger.info(`Get ${seasonText} on ${platform} for ${command.author.username} with username ${username}`);

      const rank = await this.r6Service.getRankByUsername(platform, username);

      if (!rank) {
        command.reply(`there is no rank data with your username !`);
        return;
      }

      // if there a no specified season id
      // get the last one
      if (getLastSeason) {
        const seasonIds = Object.keys(rank.seasons);
        seasonId = seasonIds[seasonIds.length - 1];
      }
      const season = rank.seasons[seasonId];
      if (!season) {
        command.reply(`there is no rank data for this season with your username !`);
        return;
      }

      const region = season.regions[regionId];
      if (!region) {
        command.reply(`there is no rank data for this season and region with your username !`);
        return;
      }

      const boards = region.boards;
      const board = boards[Object.keys(boards)[0]];

      command.reply(formatMessage([
        'your rank :',
        `Season : ${season.seasonName}`,
        `💀 Kills : ${board.kills}`,
        `☠️ Deaths : ${board.deaths}`,
        `🏆 Wins : ${board.wins}`,
        `😭 Losses : ${board.losses}`,
        `📘 MMR : ${board.current.mmr}`
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}
