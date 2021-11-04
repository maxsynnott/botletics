import { FC } from 'react'
import { useParams } from 'react-router'
import { BotStackItem } from '../components/BotStackItem'
import { useBot } from '../hooks/queries/useBot'

interface Params {
	id: string
}

export const BotPage: FC = () => {
	const { id } = useParams<Params>()
	const { data: bot } = useBot(id)
	if (!bot) return null

	return <BotStackItem bot={bot} />
}
