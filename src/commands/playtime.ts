import { container } from 'tsyringe';
import { Command, CommandMessage } from "@typeit/discord";
import { R6Service } from 'r6-api-cacher';
const humanizeDuration = require("humanize-duration");

import { R6UsernameService } from '../services/r6-username.service';

export abstract class Playtime {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);

  @Command("playtime :platform")
  async playtime(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.username);

    if (username != null) {
      const playtime = await this.r6Service.getPlaytimeByUsername(platform, username);

      const general = `⏱️ General : ${humanizeDuration(playtime.general * 1000)}`;
      const casual = `🎮 Casual : ${humanizeDuration(playtime.casual * 1000)}`;
      const ranked = `📋 Ranked : ${humanizeDuration(playtime.ranked * 1000)}`;
      const discovery = `✈️ Discovery : ${humanizeDuration(playtime.discovery * 1000)}`;

      let str = `your playtime :\n${general}\n${casual}\n${ranked}\n${discovery}`;

      command.reply(str);
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}