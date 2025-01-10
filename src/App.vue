<script setup lang="ts">
import { computed, inject } from "vue";
import { BoardGameIoKey } from "./symbols";

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
const row = computed(() => state.value.G.row)
const col = computed(() => state.value.G.col)

const culcCellId = (row: number, col: number) => (row - 1) * 3 + col - 1

const resultMsg = computed(() => {
  const isGameOver = state.value.ctx.gameover
  if (isGameOver) {
    return isGameOver.winner !== undefined ? `Winner: ${isGameOver.winner}` : "Draw"
  } else {
    return ""
  }
})
</script>

<template>
  <table>
    <tr v-for="r in row" :key="r">
      <td class="cell" v-for="c in col" :key="c" @click="client.moves.clickCell(culcCellId(r, c))">
        {{ cells[culcCellId(r, c)] ?? "" }}
      </td>
    </tr>
  </table>
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
</style>
