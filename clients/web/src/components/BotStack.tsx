import { Stack } from '@mui/material'
import { FC } from 'react'
import { useHistory } from 'react-router'
import { Bot } from '@prisma/client'
import { BotStackItem } from './BotStackItem'

interface Props {
	bots: Bot[]
}

export const BotStack: FC<Props> = ({ bots }) => {
	const history = useHistory()

	return (
		<Stack>
			{bots.map((bot) => (
				<BotStackItem bot={bot} />
			))}
		</Stack>
	)
}
