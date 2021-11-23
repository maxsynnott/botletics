import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { useHistory } from 'react-router'

interface Props {
	text: string
	path: string
	Icon: IconType
	focused: boolean
	setSidebarOpen: (value: boolean) => void
}

export const SidebarListItem: FC<Props> = ({
	text,
	path,
	Icon,
	focused,
	setSidebarOpen,
}) => {
	const history = useHistory()

	const handleClick = () => {
		history.push(path)
		setSidebarOpen(false)
	}

	return (
		<ListItem
			disableGutters
			disablePadding
			sx={{
				backgroundColor: focused
					? 'rgba(66, 165, 245, 0.2)' // TODO: Replace with custom palette color
					: 'inherit',
			}}
		>
			<ListItemButton onClick={handleClick} sx={{ py: 2, px: 4 }}>
				<ListItemIcon
					sx={{
						color: (theme) =>
							focused ? theme.palette.primary.light : '',
					}}
				>
					<Icon size={24} />
				</ListItemIcon>
				<ListItemText>
					<Typography
						sx={{
							color: (theme) =>
								focused ? theme.palette.primary.light : '',
						}}
					>
						{text}
					</Typography>
				</ListItemText>
			</ListItemButton>
		</ListItem>
	)
}
