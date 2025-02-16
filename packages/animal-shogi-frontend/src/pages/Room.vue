<script setup lang="ts">
import { boardgameIo } from '../game/init';
import GameClient from '../components/GameClient.vue';
import { animalShogi, type animalShogiState } from '../../../animal-shogi-core';
import { type Ref } from 'vue';
import type { ClientState } from 'boardgame.io/dist/types/src/client/client';
import type { PlayerID } from 'boardgame.io';

const props = defineProps<{
  roomId: string | undefined,
  playerId: PlayerID | undefined,
  // playStyle: "multi" | "single"
  playStyle: string
}>()

const boardGameIo = boardgameIo(animalShogi, props.playStyle, props.roomId, props.playerId);
</script>

<template>
  <div>
    <RouterLink to="/">← 戻る</RouterLink>
    <p>{{ playerId }}</p>
    <GameClient v-if="boardGameIo.state.value"
      :state="(boardGameIo.state) as Ref<Exclude<ClientState<animalShogiState>, null>>" :client="boardGameIo.client" />
  </div>
</template>
