<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const canPrevious = computed(() => {
  return props.modelValue > 1
})

interface Props {
  modelValue: number
}

interface Emits {
  (event: 'update:modelValue', page: number): void
  (event: 'change-page'): void
}

function emitChangePage(newPage: number) {
  emit('update:modelValue', newPage)
  emit('change-page')
}
</script>

<template>
  <div :class="$style.pagination">
    <button @click="emitChangePage(1)" :disabled="!canPrevious" :class="$style.button">
      Inicio
    </button>
    <button
      @click="emitChangePage(props.modelValue - 1)"
      :disabled="!canPrevious"
      :class="$style.button"
    >
      Anterior
    </button>
    <span>{{ modelValue }}</span>
    <button @click="emitChangePage(props.modelValue + 1)" :class="$style.button">Proximo</button>
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
