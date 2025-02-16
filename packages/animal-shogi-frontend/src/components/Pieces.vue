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
    <div v-else class="empty"></div>
  </div>
</template>

<style scoped>
img,
.empty {
  /* TODO: 相対値(100% , 100%) で定義すべき */
  /* empty のときにうまくいかず、暫定的に絶対値でスタイリング */
  width: 50px;
  height: 50px;
}
</style>
