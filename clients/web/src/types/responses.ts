import { AxiosResponse } from 'axios'
import { Bot, Game } from './models'

type Response<ResponseData> = AxiosResponse<ResponseData>

export type PostRandomGameResponse = Response<Game>
export type GetBotResponse = Response<
	Bot & { activeGames: Game[]; passiveGames: Game[] }
>
