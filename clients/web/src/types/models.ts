import { Bot as _Bot, User as _User, Game as _Game } from '@prisma'
import { ForcefullyOmit } from './types'

export type Bot = ForcefullyOmit<_Bot, 'endpoint'>
export type User = ForcefullyOmit<_User, 'passwordHash'>
export type Game = _Game
