import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Box,
	Button,
} from '@mui/material'
import { FC } from 'react'
import { useCurrentUser } from '../hooks/contexts/useCurrentUser'
import { Link } from 'react-router-dom'
import { useDeleteSession } from '../hooks/mutations/useDeleteSession'
import { useQueryClient } from 'react-query'
import { MdLogout, MdMenu } from 'react-icons/md'

interface Props {
	toggleSidebarOpen: () => void
}

export const Header: FC<Props> = ({ toggleSidebarOpen }) => {
	const { currentUser } = useCurrentUser()
	const { deleteSession } = useDeleteSession()
	const queryClient = useQueryClient()

	const handleSignOut = () => {
		deleteSession(undefined, {
			onSuccess: () => {
				queryClient.invalidateQueries('currentUser')
			},
		})
	}

	return (
		<AppBar
			position="fixed"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: (theme) => theme.palette.primary.main,
			}}
		>
			<Toolbar
				variant="dense"
				disableGutters
				sx={{ justifyContent: 'space-between', pl: 1, pr: 2 }}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton color="inherit" onClick={toggleSidebarOpen}>
						<MdMenu />
					</IconButton>

					<Typography variant="h5">Botletics</Typography>
				</Box>

				{currentUser ? (
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography>{currentUser.email}</Typography>
						<IconButton color="inherit" onClick={handleSignOut}>
							<MdLogout />
						</IconButton>
					</Box>
				) : (
					<Button to="/auth" component={Link} color="inherit">
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
