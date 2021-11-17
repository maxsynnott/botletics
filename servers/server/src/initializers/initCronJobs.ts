import { runHealthChecksQueue } from '../queues/runHealthChecksQueue'

export const initCronJobs = async () => {
	await runHealthChecksQueue.add(
		'runHealthChecks',
		{},
		{ repeat: { cron: '*/1 * * * *' } },
	)
}
