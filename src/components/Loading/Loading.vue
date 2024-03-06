<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface Props {
  size?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: '48px',
  color: '#fff'
})
</script>

<template>
  <span :class="$style.loader" :style="{ width: size, height: size, borderColor: color }"></span>
</template>

<style module lang="scss">
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
