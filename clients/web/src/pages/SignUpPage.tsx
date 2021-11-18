import { Stack, TextField, Button, Container, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useCreateSession } from '../hooks/mutations/useCreateSession'
import { useCreateUser } from '../hooks/mutations/useCreateUser'

interface Props {
	setTitle: (title: string) => void
}

export const SignUpPage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Sign up'), [])

	const queryClient = useQueryClient()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { createUser } = useCreateUser()
	const { createSession } = useCreateSession()

	const handleSubmit = () => {
		createUser(
			{ email, password },
			{
				onSuccess: () => {
					createSession(
						{ email, password },
						{
							onSuccess: () => {
								queryClient.invalidateQueries('currentUser')
								history.push('/')
							},
						},
					)
				},
			},
		)
	}

	return (
		<Container maxWidth="sm">
			<Stack spacing={1}>
				<Typography variant="h1">Sign up</Typography>
				<Link to="/signin">Sign in instead</Link>

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
