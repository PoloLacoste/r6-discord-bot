import { Command, CommandMessage } from "@typeit/discord";

export abstract class Stats {
  @Command("stats")
  async Stats(command: CommandMessage) {
    command.reply("Stats!");
  }
}