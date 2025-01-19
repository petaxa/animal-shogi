import type { PlayerID } from 'boardgame.io'

export type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'

export interface Piece {
  type: 'lion' | 'elephant' | 'geraffe' | 'chick' | 'hen'
  owner: PlayerID
}

export type Locale =
  | {
      kind: 'cell'
      col: number
      row: number
    }
  | {
      kind: 'captured'
      player: PlayerID
      index: number
    }
