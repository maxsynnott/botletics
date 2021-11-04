import { useMutation } from 'react-query'
import { postBot } from '../../api/bots'
import { PostBotBody } from '../../types/bodies'

export const useCreateBot = () => {
	return useMutation((body: PostBotBody) => postBot(body))
}
