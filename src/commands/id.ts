import { Command, CommandMessage } from "@typeit/discord";

export abstract class Id {
  @Command("id")
  async id(command: CommandMessage) {
    command.reply("id");
  }
}