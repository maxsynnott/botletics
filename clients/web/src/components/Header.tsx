import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useCurrentUser } from '../hooks/contexts/useCurrentUser'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useDeleteSession } from '../hooks/mutations/useDeleteSession'
import { useQueryClient } from 'react-query'

interface Props {
	largeScreen: boolean
	toggleSidebarOpen: () => void
	title: string
}

export const Header: FC<Props> = ({
	largeScreen,
	toggleSidebarOpen,
	title,
}) => {
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
			position="sticky"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{!largeScreen && (
						<IconButton color="inherit" onClick={toggleSidebarOpen}>
							<MenuIcon />
						</IconButton>
					)}

					<Typography variant="h5">{title}</Typography>
				</Box>

				{currentUser ? (
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography>{currentUser.email}</Typography>
						<IconButton color="inherit" onClick={handleSignOut}>
							<ExitToAppIcon />
						</IconButton>
					</Box>
				) : (
					<Link to="/signin">Sign in</Link>
				)}
			</Toolbar>
		</AppBar>
	)
}
