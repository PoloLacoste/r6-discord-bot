import { container, singleton } from "tsyringe";
import { CacheService } from 'r6-cacher';

@singleton()
export class R6UsernameService {

  private readonly cacheService = container.resolve(CacheService);
  private readonly r6Usernames = new Map<string, string>();

  async getR6Username(discordUsername: string): Promise<string> {
    if(this.cacheService.isOnline()) {
      return await this.cacheService.getId(discordUsername);
    }
    return this.r6Usernames.get(discordUsername);
  }

  async setR6Username(discordUsername: string, r6Username: string): Promise<void> {
    if(this.cacheService.isOnline()) {
      return await this.cacheService.setId(discordUsername, r6Username);
    }
    this.r6Usernames.set(discordUsername, r6Username);
  }
}