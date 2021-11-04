import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { useCreateBot } from '../hooks/mutations/useCreateBot'
import { BotType } from '../types/types'

export const BotsNewPage: FC = () => {
	const [name, setName] = useState('')
	const [endpoint, setEndpoint] = useState('')
	const [type, setType] = useState<BotType>('chess')

	const queryClient = useQueryClient()
	const history = useHistory()

	const { mutate: createBot } = useCreateBot()

	const handleSubmit = () => {
		createBot(
			{ name, endpoint, type },
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

				<FormControl>
					<InputLabel id="select-type-label">Type</InputLabel>
					<Select
						labelId="select-type-label"
						label="Type"
						value={type}
						onChange={(e) => setType(e.target.value as BotType)}
						variant="outlined"
					>
						<MenuItem value="chess">Chess</MenuItem>
					</Select>
				</FormControl>

				<Button variant="contained" onClick={handleSubmit}>
					Submit
				</Button>
			</Stack>
		</Container>
	)
}
