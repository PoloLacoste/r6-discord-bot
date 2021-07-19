import { container, singleton } from 'tsyringe';
import { CacheService } from 'r6-api-caching';

@singleton()
export class R6UsernameService {

  private readonly caching: boolean = false;
  private readonly cacheService = container.resolve(CacheService);
  private readonly r6Usernames = new Map<string, string>();

  constructor() {
    this.caching = Boolean(JSON.parse(process.env.CACHING || 'false'))
  }

  async getR6Username(id: string): Promise<string> {
    if(this.caching && this.cacheService.isOnline()) {
      return await this.cacheService.getId(id);
    }
    return this.r6Usernames.get(id);
  }

  async setR6Username(id: string, r6Username: string): Promise<void> {
    if(this.caching && this.cacheService.isOnline()) {
      return await this.cacheService.setId(id, r6Username);
    }
    this.r6Usernames.set(id, r6Username);
  }
}