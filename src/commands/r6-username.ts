import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { Logger } from 'tslog';

import { checkArgs } from "../utils";
import { R6UsernameService } from '../services/r6-username.service';

export abstract class R6Username {

  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command("setR6 :r6Username")
  async set(command: CommandMessage) {
    const valid = checkArgs(command.args, ["r6Username"]);

    if (valid) {
      const { r6Username } = command.args;
      const discordUsername = command.author.username;

      this.logger.info(`Set r6 username for ${command.author.username} with username ${r6Username}`);

      await this.r6UsernameService.setR6Username(discordUsername, r6Username);

      command.reply(`your rainbow six siege username is now : ${r6Username}.`);
    }
    else {
      command.reply("Invalid command format !");
    }
  }

  @Command("getR6")
  async get(command: CommandMessage) {
    const discordUsername = command.author.username;
    const r6Username = await this.r6UsernameService.getR6Username(discordUsername);

    if (r6Username != null) {
      this.logger.info(`Get r6 username for ${command.author.username} with username ${r6Username}`);

      command.reply(`your rainbow six siege username is : ${r6Username}.`);
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}