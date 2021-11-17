import IORedis from 'ioredis'
import { config } from '../config/config'

export const redis = new IORedis({
	host: config.redis.host,
	enableReadyCheck: false,
	maxRetriesPerRequest: null,
})
