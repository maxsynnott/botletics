import { Bot, Game } from '@prisma/client'

export type BotWithGames = Bot & {
	gamesAsWhite: Game[]
	gamesAsBlack: Game[]
}
export type GameWithBots = Game & { whiteBot: Bot; blackBot: Bot }
