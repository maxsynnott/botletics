import { Button, Radio, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { BotStackItem } from '../components/BotStackItem'
import { useCreateSet } from '../hooks/mutations/useCreateSet'
import { useBot } from '../hooks/queries/useBot'
import { useCurrentUser } from '../hooks/queries/useCurrentUser'
import { useUserBots } from '../hooks/queries/useUserBots'

interface Params {
	id: string
}

export const BotPage: FC = () => {
	const [selectedBotId, setSelectedBotId] = useState('')
	const history = useHistory()

	const { mutate: createSet } = useCreateSet()

	const { id } = useParams<Params>()
	const { data: bot } = useBot(id)
	const { data: currentUser } = useCurrentUser()
	const { data: challengingBots } = useUserBots(currentUser?.id as string, {
		enabled: Boolean(currentUser?.id),
	})
	if (!bot || !challengingBots) return null

	const handleChallenge = () => {
		createSet(
			{ botIds: [selectedBotId, bot.id] },
			{
				onSuccess: ({ id }) => {
					history.push(`/sets/${id}`)
				},
			},
		)
	}

	return (
		<Box>
			<Typography>Bot</Typography>
			<BotStackItem bot={bot} />

			<Typography>My Bots</Typography>
			<Stack>
				{challengingBots.map(({ id: _id, name }) => {
					return (
						<Stack direction="row" alignItems="center">
							<Radio
								checked={selectedBotId === _id}
								onChange={(e) =>
									setSelectedBotId(e.target.value)
								}
								value={_id}
							/>
							<Typography>{name}</Typography>
						</Stack>
					)
				})}
			</Stack>
			<Button onClick={handleChallenge}>Challenge</Button>
		</Box>
	)
}
