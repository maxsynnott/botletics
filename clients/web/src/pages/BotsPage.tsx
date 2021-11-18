import { Box } from '@mui/system'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { BotsDataGrid } from '../components/BotsDataGrid'
import { useBots } from '../hooks/queries/useBots'
import { LoadingPage } from './LoadingPage'

export const BotsPage: FC = () => {
	const { data: bots, isLoading } = useBots()
	if (isLoading) return <LoadingPage />
	if (!bots) throw new Error('Bots not found')

	return (
		<Box>
			<Link to="/bots/new">Create bot</Link>
			<BotsDataGrid bots={bots} />
		</Box>
	)
}
