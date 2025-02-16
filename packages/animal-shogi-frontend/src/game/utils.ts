import type { Locale } from "../../../animal-shogi-core"

export const localeCellFuctory = (row: number, col: number): Locale => {
  return {
    kind: 'cell',
    row,
    col,
  }
}

export const localeCapturedFuctory = (player: string, index: number): Locale => {
  return {
    kind: 'captured',
    player,
    index,
  }
}
