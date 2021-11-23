import { Container } from '@mui/material'
import { FC, useEffect } from 'react'
import { BotsDataGrid } from '../components/BotsDataGrid'
import { useBots } from '../hooks/queries/useBots'
import { LoadingPage } from './LoadingPage'

interface Props {
	setTitle: (title: string) => void
}

export const BotsPage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Bots'), [])

	const { bots, isLoading } = useBots()
	if (isLoading) return <LoadingPage />
	if (!bots) throw new Error('Bots not found')

	return (
		<Container sx={{ mt: 3 }}>
			<BotsDataGrid bots={bots} />
		</Container>
	)
}
