import { useMutation } from 'react-query'
import { postBot } from '../../api/bots'
import { PostBotBody } from '../../types/types'

export const useCreateBot = () => {
	return useMutation((body: PostBotBody) => postBot(body))
}
