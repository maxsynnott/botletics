import {
	Stack,
	TextField,
	Button,
	Container,
	Tabs,
	Box,
	Tab,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { useCreateSession } from '../hooks/mutations/useCreateSession'
import { useCreateUser } from '../hooks/mutations/useCreateUser'

interface Props {
	setTitle: (title: string) => void
}

type FormType = 'signIn' | 'signUp'

export const AuthPage: FC<Props> = ({ setTitle }) => {
	const [formType, setFormType] = useState<FormType>('signIn')

	useEffect(() => {
		setTitle(formType === 'signIn' ? 'Sign in' : 'Sign up')
	}, [formType])

	const queryClient = useQueryClient()
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { createSession } = useCreateSession()
	const { createUser } = useCreateUser()

	const signIn = () => {
		createSession(
			{ email, password },
			{
				onSuccess: () => {
					queryClient.invalidateQueries('currentUser')
					history.push('/')
				},
			},
		)
	}

	const signUp = () => {
		createUser(
			{ email, password },
			{
				onSuccess: signIn,
			},
		)
	}

	const handleSubmit = formType === 'signIn' ? signIn : signUp

	const handleTabChange = (_: any, newValue: FormType) => {
		setFormType(newValue)
	}

	return (
		<Container maxWidth="sm">
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={formType}
					onChange={handleTabChange}
					variant="fullWidth"
				>
					<Tab label="Sign in" value="signIn" />
					<Tab label="Sign up" value="signUp" />
				</Tabs>
			</Box>

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
