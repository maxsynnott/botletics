import { Box } from '@mui/system'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BotsDataGrid } from '../components/BotsDataGrid'
import { useBots } from '../hooks/queries/useBots'
import { LoadingPage } from './LoadingPage'

const BOT_LIMIT = 3

interface Props {
	setTitle: (title: string) => void
}

export const BotsPage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Bots'), [])

	const { bots, isLoading } = useBots()
	if (isLoading) return <LoadingPage />
	if (!bots) throw new Error('Bots not found')

	return (
		<Box>
			{bots.length < BOT_LIMIT && <Link to="/bots/new">Create bot</Link>}

			<BotsDataGrid bots={bots} />
		</Box>
	)
}
