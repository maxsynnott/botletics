import { AxiosResponse } from 'axios'
import { Set, Bot, Game } from './models'

type Response<ResponseData> = AxiosResponse<ResponseData>

type PostSetResponseData = Set
export type PostSetResponse = AxiosResponse<PostSetResponseData>

type GetSetResponseData = Set & { bots: Bot[]; games: Game[] }
export type GetSetResponse = Response<GetSetResponseData>
