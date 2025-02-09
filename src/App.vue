<script setup lang="ts">
import GameClient from './game/GameClient.vue';
import { BoardGameIoPlayer0Key,BoardGameIoPlayer1Key } from './symbols';
</script>

<template>
  <div class="flex">
    <GameClient :injectKey="BoardGameIoPlayer0Key" />
    <GameClient :injectKey="BoardGameIoPlayer1Key" />
  </div>
</template>

<style>
.flex{
  display: flex;
  gap: 100px;
}
</style>
