import { container } from 'tsyringe';
import { Command, CommandMessage } from "@typeit/discord";
import { R6Service } from 'r6-api-cacher';

import { R6UsernameService } from '../services/r6-username.service';

export abstract class Level {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);

  @Command("level :platform")
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.username);

    if (username != null) {
      const level = await this.r6Service.getLevelByUsername(platform, username);

      const levelStr = `⭐ Level : ${level.level}`;
      const lootbox = `📦 LootBox : ${level.lootboxProbability.percent}`;

      let str = `your level :\n${levelStr}\n${lootbox}`;

      command.reply(str);
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}