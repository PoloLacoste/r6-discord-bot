import { Logger } from 'tslog';
import { container } from 'tsyringe';
import { Command, CommandMessage } from '@typeit/discord';
import { R6Service } from 'r6-api-caching';

import { R6UsernameService } from '../services/r6-username.service';

export abstract class Id {

  private readonly r6Service = container.resolve(R6Service);
  private readonly r6UsernameService = container.resolve(R6UsernameService);
  private readonly logger = container.resolve(Logger);

  @Command('id :platform')
  async id(command: CommandMessage) {

    const platform = command.args.platform || 'uplay';
    const username = await this.r6UsernameService.getR6Username(command.author.id);
    
    if(username != null) {
      this.logger.info(`Get id on ${platform} for ${command.author.username} with username ${username}`);
      
      const id = await this.r6Service.getId(platform, username);
      command.reply(`your rainbow six siege id is : ${id}`);
    }
    else {
      command.reply(`you haven't set your rainbow six siege username yet !`);
    }
  }
}
