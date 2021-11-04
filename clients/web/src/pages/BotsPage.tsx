import { Typography } from '@mui/material'
import { FC } from 'react'
import { useBots } from '../hooks/queries/useBots'

export const BotsPage: FC = () => {
	const { data: bots } = useBots()

	return <Typography>Bots</Typography>
}
