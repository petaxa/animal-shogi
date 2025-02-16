<script setup lang="ts">
import { computed, type Ref } from "vue";
import { type animalShogiState } from "../../../animal-shogi-core";
import type { PlayerID } from "boardgame.io";
import Pieces from "./Pieces.vue";
import { localeCellFuctory, localeCapturedFuctory } from "../game/utils";
import type { Client, ClientState } from "boardgame.io/dist/types/src/client/client";

const props = defineProps<{
  state: Ref<Exclude<ClientState<animalShogiState>, null>>,
  client: ReturnType<typeof Client<animalShogiState>>
}>()

const cells = computed(() => props.state.value.G.cells)
const row = computed(() => props.state.value.G.cells.length)
const col = computed(() => props.state.value.G.cells[0].length)
const capturedPiece = computed(() => props.state.value.G.capturedPiece)

const clickCell = props.client.moves.clickCell

const resultMsg = computed(() => {
  const isGameOver = props.state.value.ctx.gameover
  if (isGameOver) {
    return isGameOver.winner !== undefined ? `Winner: ${isGameOver.winner}` : "Draw"
  } else {
    return ""
  }
})
</script>

<template>
  <div v-if="state">
    <p>{{ `${props.state.value.ctx.currentPlayer} のターンです` }}</p>
    <table>
      <!-- TODO: v-for の key を修正する -->
      <tr v-for="(_, r) in row" :key="r">
        <td class="cell" :class="cells[r][c]?.owner === '1' ? 'red' : ''" v-for="(_, c) in col" :key="c">
          <Pieces :type="cells[r][c]?.type ?? ''" :locale="localeCellFuctory(r, c)" @click-cell="clickCell" />
        </td>
      </tr>
    </table>
    <p>持ち駒</p>
    <div>
      <p>player1</p>
      <p v-for="(pieces, i) in capturedPiece[0]" :key="i" @click="clickCell(localeCapturedFuctory('0', i))">
        {{ pieces.type }}</p>
    </div>
    <div>
      <p>player2</p>
      <p v-for="(pieces, i) in capturedPiece[1]" :key="i" @click="clickCell(localeCapturedFuctory('1', i))">
        {{ pieces.type }}</p>
    </div>
    <p>{{ resultMsg }}</p>
  </div>
</template>

<style>
.cell {
  border: 1px solid #555;
  width: 50px;
  height: 50px;
  text-align: center;
}

.red {
  color: red
}
</style>
