import { Button, Container, Stack, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { useCreateBot } from '../hooks/mutations/useCreateBot'

export const BotsNewPage: FC = () => {
	const [name, setName] = useState('')
	const [endpoint, setEndpoint] = useState('')

	const queryClient = useQueryClient()
	const history = useHistory()

	const { mutate: createBot } = useCreateBot()

	const handleSubmit = () => {
		createBot(
			{ name, endpoint },
			{
				onSuccess: () => {
					queryClient.invalidateQueries('bots')
					history.push('/bots')
				},
			},
		)
	}

	return (
		<Container maxWidth="sm">
			<Stack spacing={1}>
				<TextField
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<TextField
					label="Endpoint"
					value={endpoint}
					onChange={(e) => setEndpoint(e.target.value)}
				/>

				<Button variant="contained" onClick={handleSubmit}>
					Submit
				</Button>
			</Stack>
		</Container>
	)
}
