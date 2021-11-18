import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

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
	return (
		<AppBar
			position="sticky"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				{!largeScreen && (
					<IconButton color="inherit" onClick={toggleSidebarOpen}>
						<MenuIcon />
					</IconButton>
				)}

				<Typography variant="h5">{title}</Typography>
			</Toolbar>
		</AppBar>
	)
}
