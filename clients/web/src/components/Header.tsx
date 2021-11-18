import { AppBar, Toolbar, IconButton } from '@mui/material'
import { FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

interface Props {
	largeScreen: boolean
	toggleSidebarOpen: () => void
}

export const Header: FC<Props> = ({ largeScreen, toggleSidebarOpen }) => {
	return (
		<AppBar
			position="sticky"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				{!largeScreen && (
					<IconButton
						sx={{ color: 'white' }}
						onClick={toggleSidebarOpen}
					>
						<MenuIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	)
}
