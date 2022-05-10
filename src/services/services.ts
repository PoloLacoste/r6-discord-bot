import { container } from 'tsyringe'
import { CacheService, MongoDatabase, R6Service } from 'r6-api-caching'
import { Logger } from 'tslog'

export async function initServices (): Promise<void> {
  container.registerInstance(Logger, new Logger({
    name: 'R6 discord bot',
    displayFunctionName: false,
    displayFilePath: 'hidden'
  }))
  container.registerInstance(CacheService, new CacheService(process.env.REDIS_URL))
  container.registerInstance(MongoDatabase, new MongoDatabase(process.env.MONGO_URL))
  const r6Service = new R6Service(process.env.EMAIL, process.env.PASSWORD, {
    caching: Boolean(JSON.parse(process.env.CACHING || 'false')),
    expiration: parseInt(process.env.EXPIRATION || '60000'),
    cacheService: container.resolve(CacheService),
    database: container.resolve(MongoDatabase)
  })
  await r6Service.init()
  container.registerInstance(R6Service, r6Service)
}
