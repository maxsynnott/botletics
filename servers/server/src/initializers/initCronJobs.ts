import { config } from '../config/config'
import { runHealthChecksQueue } from '../queues/runHealthChecksQueue'
import { scheduleGamesQueue } from '../queues/scheduleGamesQueue'

export const initCronJobs = async () => {
	await runHealthChecksQueue.add(
		'runHealthChecks',
		{},
		{ repeat: { cron: '*/1 * * * *' } },
	)

	await scheduleGamesQueue.add(
		'scheduleGames',
		{},
		{ repeat: { cron: config.cronJobs.scheduleGames.cronString } },
	)
}
