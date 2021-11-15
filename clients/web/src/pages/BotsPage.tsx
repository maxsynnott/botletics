import { Box } from '@mui/system'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { BotsDataGrid } from '../components/BotsDataGrid'
import { useBots } from '../hooks/queries/useBots'

export const BotsPage: FC = () => {
	const { data: bots } = useBots()
	if (!bots) return null

	return (
		<Box>
			<Link to="/bots/new">Create bot</Link>
			<BotsDataGrid bots={bots} />
		</Box>
	)
}
