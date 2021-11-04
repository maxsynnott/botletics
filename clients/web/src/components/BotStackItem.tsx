import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { useHistory } from 'react-router'
import { Bot } from '../types/models'

interface Props {
	bot: Bot
}

export const BotStackItem: FC<Props> = ({ bot: { id, name, type } }) => {
	const history = useHistory()

	return (
		<Card>
			<CardActionArea
				onClick={() => {
					history.push(`/bots/${id}`)
				}}
			>
				<CardContent>
					<Typography>{name}</Typography>
					<Typography>{type}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
