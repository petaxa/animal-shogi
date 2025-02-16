<script setup lang="ts">
import { getImageUrl } from '../utils/img';
import type { Locale, Piece } from '../../../animal-shogi-core/';
import { computed } from 'vue';


const props = defineProps<{
  type: Piece["type"] | "",
  locale: Locale
}>()

defineEmits<{
  clickCell: [locale: Locale]
}>()

const imageUrl = computed(() => props.type === "" ? null : getImageUrl(props.type))

</script>

<template>
  <div @click="$emit('clickCell', locale)">
    <img v-if="imageUrl" :src="imageUrl" alt="">
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
