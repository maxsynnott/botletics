import { Queue, QueueScheduler, Worker } from 'bullmq'
import { redis as connection } from '../clients/redis'
import { BotService } from '../services/BotService'

export const name = 'runHealthChecks'

new QueueScheduler(name, { connection })
export const runHealthChecksQueue = new Queue(name, {
	connection,
})

const processJob = async () => {
	try {
		console.log('Running job: ' + name)
		await BotService.runHealthChecks()
	} catch (e) {
		console.error(e)
	}
}

new Worker(name, processJob, { connection })
