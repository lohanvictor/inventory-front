<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '48px',
  color: '#fff'
})

const borderColor = computed(() => `${props.color} transparent`)
</script>

<template>
  <span :class="$style.loader" :style="{ width: size, height: size, borderColor }"></span>
</template>

<style module lang="scss">
// .loader {
//   width: 48px;
//   height: 48px;
//   border: 5px solid #fff;
//   border-bottom-color: transparent;
//   border-radius: 50%;
//   display: inline-block;
//   box-sizing: border-box;
//   animation: rotation 1s linear infinite;
// }

// @keyframes rotation {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

/* HTML: <div class="loader"></div> */
.loader {
  display: block;
  border-radius: 50%;
  border: 4px solid;
  border-color: red #0000;
  animation: l1 1s infinite;
}
@keyframes l1 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
