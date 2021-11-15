import { useMutation } from 'react-query'
import { startGame } from '../../api/games'

export const useStartGame = () => {
	return useMutation((id: string) => startGame(id))
}
