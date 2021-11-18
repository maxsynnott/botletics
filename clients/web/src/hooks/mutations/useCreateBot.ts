import { useMutation } from 'react-query'
import { postBot } from '../../api/bots'
import { PostBotBody } from '../../types/bodies'

export const useCreateBot = () => {
	const result = useMutation((body: PostBotBody) => postBot(body))
	return { ...result, createBot: result.mutate }
}
