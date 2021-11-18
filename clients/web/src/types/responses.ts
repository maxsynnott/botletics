import { AxiosResponse } from 'axios'
import { Bot, Game } from '@prisma/client'

type Response<ResponseData> = AxiosResponse<ResponseData>

export type GetBotResponse = Response<
	Bot & { gamesAsWhite: Game[]; gamesAsBlack: Game[] }
>
