import { Stack, TextField, Button, Container, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useCreateSession } from '../hooks/mutations/useCreateSession'

export const SignInPage: FC = () => {
	const queryClient = useQueryClient()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { mutate: createSession } = useCreateSession()

	const handleSubmit = () => {
		createSession(
			{ email, password },
			{
				onSuccess: () => {
					queryClient.invalidateQueries(['users'])
					history.push('/')
				},
			},
		)
	}

	return (
		<Container maxWidth="sm">
			<Stack spacing={1}>
				<Typography variant="h1">Sign in</Typography>
				<Link to="/signup">Sign up instead</Link>

				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button variant="contained" onClick={handleSubmit}>
					Submit
				</Button>
			</Stack>
		</Container>
	)
}