import { Queue, Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import { config } from '../config/config'
import { ChessService } from '../services/ChessService'

const connection = new IORedis({ host: config.redis.host })

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
