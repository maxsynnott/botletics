import { Queue, QueueScheduler, Worker } from 'bullmq'
import { redis as connection } from '../clients/redis'
import { BotService } from '../services/BotService'

export const name = 'runHealthChecks'

new QueueScheduler(name, { connection })
export const runHealthChecksQueue = new Queue(name, {
	connection,
})

const processJob = async () => {
	const bots = await BotService.getAll()
	await Promise.all(bots.map((bot) => BotService.runHealthCheck(bot)))
}

new Worker(name, processJob, { concurrency: 1, connection })
