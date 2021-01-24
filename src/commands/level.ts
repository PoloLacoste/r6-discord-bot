import { container } from 'tsyringe';
import { Command, CommandMessage } from "@typeit/discord";
import { R6Service } from 'r6-api-caching';

import { R6UsernameService } from '../services/r6-username.service';
import { formatMessage } from '../utils';

export abstract class Level {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);

  @Command("level :platform")
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.username);

    if (username != null) {
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