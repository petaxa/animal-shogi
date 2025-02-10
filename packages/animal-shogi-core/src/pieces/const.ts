import type { Direction } from './types'

const all: Direction[] = [
  'up',
  'down',
  'left',
  'right',
  'up-left',
  'up-right',
  'down-left',
  'down-right',
]

export const DIRECTION_LION: Direction[] = [...all]
export const DIRECTION_ELEPHANT: Direction[] = ['up-left', 'up-right', 'down-left', 'down-right']
export const DIRECTION_GERAFFE: Direction[] = ['up', 'left', 'right', 'down']
export const DIRECTION_CHICK: Direction[] = ['up']
export const DIRECTION_HEN: Direction[] = ['up-left', 'up', 'up-right', 'left', 'right', 'down']

export const ENDLINE_MAP = {
  '0': 0,
  '1': 3,
}
