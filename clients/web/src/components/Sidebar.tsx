import { Drawer, List, Toolbar } from '@mui/material'
import { FC } from 'react'
import { SidebarListItem } from './SidebarListItem'
import { MdHome } from 'react-icons/md'
import { FaRobot } from 'react-icons/fa'
import { useLocation } from 'react-router'

const DRAWER_WIDTH = 280

interface Props {
	open: boolean
}

const listItems = [
	{
		text: 'Home',
		path: '/',
		Icon: MdHome,
	},
	{ text: 'Bots', path: '/bots', Icon: FaRobot },
]

export const Sidebar: FC<Props> = ({ open }) => {
	const { pathname } = useLocation()
	const focusedPath = pathname?.match(/^(\/\w*)\/?/)?.[1]

	return (
		<>
			<Drawer
				variant={'temporary'}
				anchor="left"
				sx={{ width: DRAWER_WIDTH }}
				open={open}
			>
				<Toolbar variant="dense" /> {/* Padding */}
				<List disablePadding sx={{ width: DRAWER_WIDTH }}>
					{listItems.map(({ text, path, Icon }) => (
						<SidebarListItem
							key={path}
							text={text}
							path={path}
							Icon={Icon}
							focused={focusedPath === path}
						/>
					))}
				</List>
			</Drawer>
		</>
	)
}
