import { container } from "tsyringe";
import { CacheService, MongoDatabase, R6Service } from "r6-api-caching";

export function initServices(): void {

  container.registerInstance(CacheService, new CacheService(process.env.REDIS_URL));
  container.registerInstance(MongoDatabase, new MongoDatabase(process.env.MONGO_URL));
  container.registerInstance(R6Service,
    new R6Service(process.env.EMAIL, process.env.PASSWORD, {
      caching: Boolean(JSON.parse(process.env.CACHING || "false")),
      expiration: parseInt(process.env.EXPIRATION || "60000"),
      cacheService: container.resolve(CacheService),
      database: container.resolve(MongoDatabase)
    })
  );
}