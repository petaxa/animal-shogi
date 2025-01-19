import {
  DIRECTION_LION,
  DIRECTION_ELEPHANT,
  DIRECTION_GERAFFE,
  DIRECTION_CHICK,
  DIRECTION_HEN,
} from './const'
import type { Direction, Piece } from './types'

export const findDirections = (type: Piece['type']): Direction[] => {
  switch (type) {
    case 'lion':
      return DIRECTION_LION
    case 'elephant':
      return DIRECTION_ELEPHANT
    case 'geraffe':
      return DIRECTION_GERAFFE
    case 'chick':
      return DIRECTION_CHICK
    case 'hen':
      return DIRECTION_HEN
  }
}

export const directionOffsets = (direction: Direction): [number, number] => {
  switch (direction) {
    case 'up':
      return [-1, 0]
    case 'down':
      return [1, 0]
    case 'left':
      return [0, -1]
    case 'right':
      return [0, 1]
    case 'up-left':
      return [-1, -1]
    case 'up-right':
      return [-1, 1]
    case 'down-left':
      return [1, -1]
    case 'down-right':
      return [1, 1]
  }
}
