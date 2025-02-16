<script setup lang="ts">
import { ref } from 'vue';

const playerSide = ref("0")
const roomId = ref("")
</script>

<template>
  <div>
    <section>
      <p>シングルプレイ</p>
      <RouterLink to="/room/single">Room →</RouterLink>
    </section>
    <section>
      <p>マルチプレイ</p>
      <div>
        <input type="radio" name="playerSide" id="first" value="0" v-model="playerSide" />
        <label for="0">先手</label>
        <input type="radio" name="playerSide" id="second" value="1" v-model="playerSide" />
        <label for="1">後手</label>
      </div>
      <input type="text" v-model="roomId" placeholder="ルームID" />
      <RouterLink :to="`/room/multi/${roomId}/${playerSide}`">Room →</RouterLink>
    </section>
  </div>
</template>
