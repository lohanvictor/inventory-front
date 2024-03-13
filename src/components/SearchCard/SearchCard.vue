<script setup lang="ts">
import { VinylsService, type Vinyl } from '@/services/vinyls.service'
import { useVinyls } from '@/stores/useVinyls'
import { computed, ref } from 'vue'
import Loading from '../Loading/Loading.vue'

interface Props {
  album: Vinyl
}
interface Emits {
  (event: 'click', payload: Vinyl): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const artists = computed(() => {
  return props.album.artists.map((artist) => artist.name).join(', ')
})
const backgroundImage = computed(() => {
  return `url(${props.album.cover})`
})

const vinylsStore = useVinyls()
const alreadyAdded = computed(() => {
  return vinylsStore.vinyls.some((vinyl) => vinyl.externalId === props.album.externalId)
})

const isLoading = ref(false)

async function fetchVinyls() {
  const newVinyls = await VinylsService.getVinyls()
  vinylsStore.updateVinyls(newVinyls)
}

async function addVinyl() {
  try {
    isLoading.value = true
    await VinylsService.addVinyl(props.album)
    await fetchVinyls()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

async function removeVinyl() {
  try {
    isLoading.value = true
    await VinylsService.deleteVinyl(props.album.externalId)
    await fetchVinyls()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function clickButton() {
  if (alreadyAdded.value) {
    removeVinyl()
  } else {
    addVinyl()
  }
}
</script>

<template>
  <button :class="$style.card" @click="emits('click', props.album)">
    <div :class="$style.info">
      <div :class="$style.img" :style="{ backgroundImage }"></div>
      <div :class="$style.texts">
        <p :class="$style.name">{{ album.name }}</p>
        <p :class="$style.artists">
          {{ artists }}
        </p>
        <p :class="$style.year">{{ album.year }}</p>
      </div>
    </div>
    <button @click.stop="clickButton" :class="[$style.button, alreadyAdded ? $style.remove : '']">
      <Loading v-if="isLoading" size="24px" />
      <span v-else-if="alreadyAdded">Remover</span>
      <span v-else-if="!alreadyAdded"> Adicionar </span>
    </button>
  </button>
</template>

<style module lang="scss">
button.card {
  background-color: #333;
  padding: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transform: scale(99%);
  .info {
    display: flex;
    gap: 8px;
    .img {
      width: 128px;
      height: 128px;
      background-size: cover;
    }
    .texts {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      .name {
        font-size: 32px;
        font-weight: 200;
        color: white;
      }
      .artists {
        font-size: 16px;
        font-weight: 600;
        color: white;
      }
      .year {
        font-size: 14px;
        font-weight: 600;
        color: white;
      }
    }
  }

  .button {
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: #34b94f;
    color: white;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    width: 150px;

    &.remove {
      background-color: #b93434;
    }
  }

  &:hover {
    transform: scale(100%);
    transition: 0.2s;
  }
}
</style>
