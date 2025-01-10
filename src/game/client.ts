import type { Game } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

export type TicTacToeState = {
  cells: (number | null)[]
  row: number
  col: number
  holdingId: number | null
}

export const TicTacToe: Game<TicTacToeState> = {
  setup: (): TicTacToeState => {
    const row = 4
    const col = 3
    // 1: ひよこ
    // 2: ぞう
    // 3: きりん
    // 4: らいおん
    const cells = [3, 4, 2, null, 1, null, null, 1, null, 2, 4, 3]

    return {
      cells,
      row,
      col,
      holdingId: null,
    }
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickCell: ({ G, ctx }, id: number): typeof INVALID_MOVE | void => {
      console.log('clickCell', id)
      if (G.holdingId === null) {
        G.holdingId = id
      } else {
        // 移動対象を指定
        // 移動先を指定
      }
    },
  },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },

  ai: {
    enumerate: (G) => {
      const moves = []
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] })
        }
      }
      return moves
    },
  },
}

function IsVictory(cells: TicTacToeState['cells']) {
  // ライオンが向こう岸にタッチしている
  // ライオンを取得した
  return false
}

// Return true if all `cells` are occupied.
function IsDraw(cells: TicTacToeState['cells']) {
  // 3 度同じ盤面が繰り返される
  return false
}
