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
}

export const SidebarListItem: FC<Props> = ({ text, path, Icon, focused }) => {
	const history = useHistory()

	const handleClick = () => history.push(path)

	console.log(focused)

	return (
		<ListItem
			disableGutters
			disablePadding
			sx={{
				backgroundColor: focused
					? 'rgba(66, 165, 245, 0.2)'
					: 'inherit',
			}}
		>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon
					sx={{
						py: 1,
						px: 2,
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
