<script setup lang="ts">
import { boardgameIo } from '../game/init';
import GameClient from '../components/GameClient.vue';
import { animalShogi, type animalShogiState } from '../../../animal-shogi-core';
import { type Ref } from 'vue';
import type { ClientState } from 'boardgame.io/dist/types/src/client/client';
import type { PlayerID } from 'boardgame.io';

// TODO: multi, single を定数として定義する。
const props = defineProps<
  {
    playStyle: 'single'
  }
  | {
    playStyle: 'multi'
    roomId: string
    playerId: PlayerID
  }>()

const option = props.playStyle === "single" ? { style: props.playStyle } : { style: props.playStyle, matchId: props.roomId, playerId: props.playerId }

const boardGameIo = boardgameIo(animalShogi, option);
</script>

<template>
  <div>
    <RouterLink to="/">← 戻る</RouterLink>
    <GameClient v-if="boardGameIo.state.value"
      :state="(boardGameIo.state) as Ref<Exclude<ClientState<animalShogiState>, null>>" :client="boardGameIo.client" />
  </div>
</template>
