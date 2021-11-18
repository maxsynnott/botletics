import { Button, Container, Stack, TextField } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { useCreateBot } from '../hooks/mutations/useCreateBot'

interface Props {
	setTitle: (title: string) => void
}

export const BotsNewPage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Create bot'), [])

	const [name, setName] = useState('')
	const [endpoint, setEndpoint] = useState('')

	const queryClient = useQueryClient()
	const history = useHistory()

	const { createBot } = useCreateBot()

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
