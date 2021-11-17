import { Queue, QueueScheduler, Worker } from 'bullmq'
import { redis as connection } from '../clients/redis'
import { GameService } from '../services/GameService'

export const name = 'scheduleGames'

new QueueScheduler(name, { connection })
export const scheduleGamesQueue = new Queue(name, {
	connection,
})

const processJob = async () => {
	try {
		console.log('Running job: ' + name)
		await GameService.scheduleGames()
	} catch (e) {
		console.error(e)
	}
}

new Worker(name, processJob, { connection })
