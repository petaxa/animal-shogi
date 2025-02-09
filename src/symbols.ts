import type { InjectionKey, Ref } from 'vue'
import { Client } from 'boardgame.io/client'
import type { TicTacToeState } from './game/client'
import type { ClientState } from 'boardgame.io/dist/types/src/client/client'

export type BoardGameIo = {
  client: ReturnType<typeof Client<TicTacToeState>>
  state: Ref<ClientState<TicTacToeState>>
}
export const BoardGameIoPlayer0Key: InjectionKey<BoardGameIo> = Symbol('boardgameIo')
export const BoardGameIoPlayer1Key: InjectionKey<BoardGameIo> = Symbol('boardgameIo')
