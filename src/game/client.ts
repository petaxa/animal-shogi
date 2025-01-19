import type { Game, PlayerID } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'
import type { Direction, Locale, Piece } from './pieces/types'
import { directionOffsets, findDirections } from './pieces/utils'
import { ENDLINE_MAP } from './pieces/const'

export type TicTacToeState = {
  cells: (Piece | null)[][]
  pickingPieceLocale: Locale | null
  capturedPiece: { [key in PlayerID]: Piece[] }
}

export const TicTacToe: Game<TicTacToeState> = {
  setup: ({ ctx }): TicTacToeState => {
    const cells: TicTacToeState['cells'] = [
      [
        { type: 'geraffe', owner: '1' },
        { type: 'lion', owner: '1' },
        { type: 'elephant', owner: '1' },
      ],
      [null, { type: 'chick', owner: '1' }, null],
      [null, { type: 'chick', owner: '0' }, null],
      [
        { type: 'elephant', owner: '0' },
        { type: 'lion', owner: '0' },
        { type: 'geraffe', owner: '0' },
      ],
    ]

    const capturedPiece = Object.fromEntries(
      [...Array(ctx.numPlayers).keys()].map((key) => [key.toString(), []]),
    )

    return {
      cells,
      pickingPieceLocale: null,
      capturedPiece,
    }
  },

  turn: {
    minMoves: 2,
  },

  moves: {
    clickCell: ({ G, ctx, events }, locale: Locale): typeof INVALID_MOVE | void => {
      console.log('clickCell', locale)

      if (G.pickingPieceLocale === null) {
        const pickingPiece =
          locale.kind === 'cell'
            ? G.cells[locale.row][locale.col]
            : G.capturedPiece[locale.player][locale.index]

        if (!pickingPiece || pickingPiece.owner !== ctx.currentPlayer) {
          console.log('wrong piece is holding')
          return
        }
        G.pickingPieceLocale = locale
      } else {
        // 移動先はセルじゃないといけない
        if (locale.kind !== 'cell') {
          console.log('wrong locale')
          G.pickingPieceLocale = null
          return
        }

        // 移動対象を取得
        const pickingPiece =
          G.pickingPieceLocale.kind === 'cell'
            ? G.cells[G.pickingPieceLocale.row][G.pickingPieceLocale.col]
            : G.capturedPiece[G.pickingPieceLocale.player][G.pickingPieceLocale.index]
        if (!pickingPiece) {
          console.log('empty holding')
          G.pickingPieceLocale = null
          return
        }

        // 移動できるかを確認
        const destinationPiece = G.cells[locale.row][locale.col]
        if (
          !isMove(
            G.cells,
            G.pickingPieceLocale,
            locale,
            pickingPiece,
            destinationPiece,
            ctx.currentPlayer,
          )
        ) {
          console.log('Cant move')
          G.pickingPieceLocale = null
          return
        }

        // 持ち駒の更新
        if (G.pickingPieceLocale.kind === 'cell' && destinationPiece) {
          const capturedPiece: Piece = { ...destinationPiece, owner: ctx.currentPlayer }
          G.capturedPiece[ctx.currentPlayer].push(capturedPiece)
        }

        // 成る
        if (ctx.currentPlayer !== '0' && ctx.currentPlayer !== '1') {
          throw Error('currentPlayer is invalid')
        }
        if (pickingPiece.type === 'chick' && locale.row === ENDLINE_MAP[ctx.currentPlayer]) {
          pickingPiece.type = 'hen'
        }

        // 移動
        if (G.pickingPieceLocale.kind === 'cell') {
          G.cells[G.pickingPieceLocale.row][G.pickingPieceLocale.col] = null
        } else {
          G.capturedPiece[G.pickingPieceLocale.player] = [
            ...G.capturedPiece[G.pickingPieceLocale.player].slice(0, G.pickingPieceLocale.index),
            ...G.capturedPiece[G.pickingPieceLocale.player].slice(G.pickingPieceLocale.index + 1),
          ]
        }
        G.cells[locale.row][locale.col] = pickingPiece
        G.pickingPieceLocale = null

        events.endTurn()
      }
    },
  },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells, ctx.currentPlayer)) {
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

function IsVictory(cells: TicTacToeState['cells'], currentPlayer: PlayerID) {
  if (currentPlayer !== '0' && currentPlayer !== '1') {
    throw Error('currentPlayer is invalid')
  }

  // 自分以外のプレイヤーのライオンが存在することを確認
  const isExistEnemyLion = cells
    .flat()
    .some((cell) => cell?.type === 'lion' && cell.owner !== currentPlayer)
  // 自分のライオンが向こう岸に存在することを確認
  const isExistLionOnEndline = cells[ENDLINE_MAP[currentPlayer]].some(
    (cell) => cell?.type === 'lion' && cell.owner === currentPlayer,
  )

  // 敵のライオンが盤面にない もしくは 自分のライオンが向こう岸にタッチ
  const isVictory = !isExistEnemyLion || isExistLionOnEndline
  return isVictory
}

// Return true if all `cells` are occupied.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IsDraw(cells: TicTacToeState['cells']) {
  // TODO: 一旦未実装。3 度同じ盤面が繰り返されるとドロー
  return false
}

function isMove(
  cells: TicTacToeState['cells'],
  pickingPieceLocale: Locale,
  destinationLocale: Extract<Locale, { kind: 'cell' }>,
  pickingPiece: Piece,
  destinationPiece: Piece | null,
  // TODO: もっといい変数名に。操作するプレイヤー
  turnPlayer: PlayerID,
) {
  if (pickingPieceLocale.kind === 'captured') {
    // 打つ先に駒が存在しないことを確認
    const isExistPiece = cells[destinationLocale.row][destinationLocale.col] !== null

    // 存在しなかったら移動可能
    return !isExistPiece
  } else {
    // 今回の駒の移動方向を算出
    const diffRow = destinationLocale.row - pickingPieceLocale.row
    const diffCol = destinationLocale.col - pickingPieceLocale.col

    // 駒の移動方向と比較して、移動可能な位置か検証
    const allowedDirections: Direction[] = findDirections(pickingPiece.type)
    const matchesAllowedDirection: boolean = allowedDirections.some((direction) => {
      const [ableRow, ableCol] = directionOffsets(direction).map((ele) =>
        turnPlayer == '0' ? ele : ele * -1,
      )
      return ableRow === diffRow && ableCol === diffCol
    })

    // 自分の駒の位置に移動していないか検証
    const isNotOwnPiece: boolean = destinationPiece?.owner !== turnPlayer

    return matchesAllowedDirection && isNotOwnPiece
  }
}
