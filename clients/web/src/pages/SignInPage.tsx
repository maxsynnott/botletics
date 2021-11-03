import { Stack, TextField, Button, Container } from '@mui/material'
import { FC, useState } from 'react'
import { useCreateSession } from '../hooks/mutations/useCreateSession'

export const SignInPage: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { mutate } = useCreateSession()

	const handleSubmit = () => {
		mutate({ email, password })
	}

	return (
		<Container maxWidth="sm">
			<Stack spacing={1}>
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
