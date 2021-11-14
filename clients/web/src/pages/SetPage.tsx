import { Button, Container } from '@mui/material'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import { GameGrid } from '../components/GameGrid'
import { useStartSet } from '../hooks/mutations/useStartSet'
import { useSet } from '../hooks/queries/useSet'

interface Params {
	id: string
}

export const SetPage = () => {
	const { id } = useParams<Params>()
	const { data: set } = useSet(id)
	const { mutate: startSet } = useStartSet()

	const handleStart = () => {
		startSet(id)
	}

	return (
		<Container maxWidth="sm">
			<Button onClick={handleStart}>Start</Button>
			{set?.games && <GameGrid games={set?.games} />}
		</Container>
	)
}
