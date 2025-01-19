<script setup lang="ts">
import { computed, inject } from "vue";
import { BoardGameIoKey } from "./symbols";
import type { Locale } from "./game/pieces/types";

const boardGameIo = inject(BoardGameIoKey);
if (boardGameIo == undefined) {
  throw new Error("inject invalid")
}

const client = boardGameIo.client
const state = computed(() => {
  const value = boardGameIo.state.value
  if (value === null) {
    throw new Error("ClientState is null")
  }
  return value
})

const cells = computed(() => state.value.G.cells)
const row = computed(() => state.value.G.cells.length)
const col = computed(() => state.value.G.cells[0].length)
const capturedPiece = computed(() => state.value.G.capturedPiece)

const resultMsg = computed(() => {
  const isGameOver = state.value.ctx.gameover
  if (isGameOver) {
    return isGameOver.winner !== undefined ? `Winner: ${isGameOver.winner}` : "Draw"
  } else {
    return ""
  }
})

const localeCellFuctory = (row: number, col: number): Locale => {
  return {
    kind: "cell",
    row, col
  }
}

const localeCapturedFuctory = (player: string, index: number): Locale => {
  return {
    kind: "captured",
    player, index
  }
}
</script>

<template>
  <p>{{ `${state.ctx.currentPlayer} のターンです` }}</p>
  <table>
    <!-- TODO: v-for の key を修正する -->
    <tr v-for="(_, r) in row" :key="r">
      <td class="cell" :class="cells[r][c]?.owner === '1' ? 'red' : ''" v-for="(_, c) in col" :key="c"
        @click="client.moves.clickCell(localeCellFuctory(r, c))">
        {{ cells[r][c]?.type ?? "" }}
      </td>
    </tr>
  </table>
  <p>持ち駒</p>
  <div>
    <p>player1</p>
    <p v-for="(pieces, i) in capturedPiece[0]" :key="i" @click="client.moves.clickCell(localeCapturedFuctory('0', i))">
      {{ pieces.type }}</p>
  </div>
  <div>
    <p>player2</p>
    <p v-for="(pieces, i) in capturedPiece[1]" :key="i" @click="client.moves.clickCell(localeCapturedFuctory('1', i))">
      {{ pieces.type }}</p>
  </div>
  <p>{{ resultMsg }}</p>
</template>

<style>
.cell {
  border: 1px solid #555;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.red {
  color: red
}
</style>
