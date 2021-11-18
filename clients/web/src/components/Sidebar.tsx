import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Toolbar,
} from '@mui/material'
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
				<Toolbar /> {/* This is for padding under App Bar */}
				<List disablePadding sx={{ width: DRAWER_WIDTH }}>
					<ListItem component={Link} to="/signin">
						<ListItemText>Sign in</ListItemText>
					</ListItem>
					<Divider />
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
