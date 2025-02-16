<script setup lang="ts">
import { boardgameIo } from '../game/init';
import GameClient from '../components/GameClient.vue';
import { useRoute } from 'vue-router'
import { animalShogi, type animalShogiState } from '../../../animal-shogi-core';
import { type Ref } from 'vue';
import type { ClientState } from 'boardgame.io/dist/types/src/client/client';

const route = useRoute()

// TODO: 共通化
const paramsRoomId = route.params.roomId
const paramsPlayerId = route.params.playerId
const paramsStyle = route.params.style

const roomId = Array.isArray(paramsRoomId) ? paramsRoomId[0] : paramsRoomId
const playerId = Array.isArray(paramsPlayerId) ? paramsPlayerId[0] : paramsPlayerId
// TODO: 型を "multi" | "single" にしたい
const style = Array.isArray(paramsStyle) ? paramsStyle[0] : paramsStyle

const boardGameIo = boardgameIo(animalShogi, style, roomId, playerId);
</script>

<template>
  <div>
    <RouterLink to="/">← 戻る</RouterLink>
    <p>{{ playerId }}</p>
    <GameClient v-if="boardGameIo.state.value"
      :state="(boardGameIo.state) as Ref<Exclude<ClientState<animalShogiState>, null>>" :client="boardGameIo.client" />
  </div>
</template>
