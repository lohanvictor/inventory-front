<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<Props>()
defineEmits<Emits>()

function generateLetters(): string[] {
  const letters: string[] = []
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i))
  }
  return letters
}

const allLetters = computed(() => {
  const generatedLetters = generateLetters()
  return generatedLetters
})

interface Props {
  modelValue: string
}
interface Emits {
  (event: 'update:modelValue', value: string): void
}
</script>

<template>
  <div :class="$style.wrapper">
    <template v-for="letter in allLetters" :key="letter">
      <button
        @click="$emit('update:modelValue', letter)"
        :class="{ [$style.selected]: props.modelValue === letter }"
      >
        {{ letter }}
      </button>
    </template>
  </div>
</template>

<style module lang="scss">
.wrapper {
  width: 100%;
  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  button {
    cursor: pointer;
    width: 48px;
    height: 48px;
    color: #222;
    background-color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 16px;

    &:hover {
      background-color: #f0f0f0;
    }

    &.selected {
      cursor: default;
      background-color: #333;
      color: white;
      font-weight: 400;
    }
  }
}
</style>
