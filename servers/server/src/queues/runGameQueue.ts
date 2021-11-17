import { Queue, Worker, Job } from 'bullmq'
import { redis as connection } from '../clients/redis'
import { ChessService } from '../services/ChessService'

interface JobData {
	gameId: string
}

const name = 'runGame'

export const runGameQueue = new Queue<JobData>(name, { connection })

const processJob = async (job: Job<JobData>) => {
	try {
		console.log('Running job: ' + name)
		const { gameId } = job.data
		await ChessService.runGame(gameId)
	} catch (e) {
		console.error(e)
	}
}

new Worker(name, processJob, { concurrency: 16, connection })
