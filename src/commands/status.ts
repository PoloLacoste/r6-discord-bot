import { Logger } from 'tslog';
import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';
import { formatMessage } from '../utils';

export abstract class Status {

  private readonly r6Service = container.resolve(R6Service);
  private readonly logger = container.resolve(Logger);

  @Command('status')
  async status(command: CommandMessage) {
    this.logger.info(`Sent server status message to ${command.author.username}`);

    const serverStatus = await this.r6Service.getServersStatus();
    const response = ['server status :'];

    for (const server of serverStatus) {
      const online = server.status === 'Online' ? '🟢' : '🔴';
      response.push(`${online} : ${server.name}`);
    }

    command.reply(formatMessage(response));
  }
}
