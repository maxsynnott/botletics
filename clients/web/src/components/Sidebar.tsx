import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Stack,
} from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const DRAWER_WIDTH = 280

export const Sidebar: FC = () => {
	// TODO: Provide mobile support by setting variant to temporary and making toggleable
	return (
		<Drawer variant="permanent" anchor="left" sx={{ width: DRAWER_WIDTH }}>
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
	)
}
