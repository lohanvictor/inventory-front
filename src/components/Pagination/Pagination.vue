<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<Props>()
defineEmits<Emits>()

const canPrevious = computed(() => {
  return props.currentPage <= 1
})

interface Props {
  currentPage: number
}

interface Emits {
  (event: 'change-page', page: number): void
}
</script>

<template>
  <div :class="$style.pagination">
    <button :disabled="!canPrevious" :class="$style.button">Inicio</button>
    <button :disabled="!canPrevious" :class="$style.button">Anterior</button>
    <span>{{ currentPage }}</span>
    <button :class="$style.button">Proximo</button>
  </div>
</template>

<style module lang="scss">
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;

  .button {
    cursor: pointer;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: transparent;
    font-weight: bold;
    color: white;

    transition: 0.2s;

    &:hover {
      background-color: #dadada;
      color: #222;
    }
  }

  span {
    font-weight: bold;
    color: white;
  }
}
</style>
