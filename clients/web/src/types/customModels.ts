import { Bot, Game } from './models'

export type GameWithBots = Game & { whiteBot: Bot; blackBot: Bot }
