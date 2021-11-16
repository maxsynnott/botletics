import { Queue, Worker, Job } from 'bullmq'
import { redis as connection } from '../clients/redis'
import { ChessService } from '../services/ChessService'

const name = 'runGameQueue'

interface JobData {
	gameId: string
}

export const runGameQueue = new Queue<JobData>(name, { connection })

const processJob = async (job: Job<JobData>) => {
	const { gameId } = job.data
	console.log('Starting game: ' + gameId)
	await ChessService.runGame(gameId)
}

new Worker(name, processJob, { concurrency: 9, connection })
