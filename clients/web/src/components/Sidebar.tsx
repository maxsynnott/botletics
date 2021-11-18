import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const DRAWER_WIDTH = 280

interface Props {
	largeScreen: boolean
	open: boolean
}

export const Sidebar: FC<Props> = ({ largeScreen, open }) => {
	// TODO: Provide mobile support by setting variant to temporary and making toggleable
	return (
		<>
			<Drawer
				variant={largeScreen ? 'permanent' : 'temporary'}
				anchor="left"
				sx={{ width: DRAWER_WIDTH }}
				open={open}
			>
				{/* ?: Should this be dynamically set according to app bar height? */}
				{/* This is just to position drawer under App Bar */}
				<Toolbar />

				<List disablePadding sx={{ width: DRAWER_WIDTH }}>
					<ListItem component={Link} to="/">
						<ListItemText>Home</ListItemText>
					</ListItem>
					<ListItem component={Link} to="/bots">
						<ListItemText>Bots</ListItemText>
					</ListItem>
				</List>
			</Drawer>
		</>
	)
}
