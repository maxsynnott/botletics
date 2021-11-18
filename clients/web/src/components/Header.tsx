import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useCurrentUser } from '../hooks/queries/useCurrentUser'
import { Link } from 'react-router-dom'

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
					<Typography>{currentUser.email}</Typography>
				) : (
					<Link to="/signin">Sign in</Link>
				)}
			</Toolbar>
		</AppBar>
	)
}
