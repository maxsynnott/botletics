import { Button } from '@mui/material'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import { useStartSet } from '../hooks/mutations/useStartSet'
import { useSet } from '../hooks/queries/useSet'

interface Params {
	id: string
}

export const SetPage = () => {
	const { id } = useParams<Params>()
	const { data: set } = useSet(id)
	const { mutate: startSet } = useStartSet()
	const queryClient = useQueryClient()

	const handleStart = () => {
		startSet(id, {
			onSuccess: () => {
				queryClient.invalidateQueries('sets')
			},
		})
	}

	return (
		<>
			<Button onClick={handleStart}>Start</Button>
			<pre>{JSON.stringify(set, null, 4)}</pre>
		</>
	)
}
