import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { Logger } from 'tslog';

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Level {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command("level :platform")
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.id);
    
    if (username != null) {
      this.logger.info(`Get level on ${platform} for ${command.author.username} with username ${username}`);

      const level = await this.r6Service.getLevelByUsername(platform, username);

      command.reply(formatMessage([
        'your level :',
        `⭐ Level : ${level.level}`,
        `📦 LootBox : ${level.lootboxProbability.percent}`
      ]));
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}