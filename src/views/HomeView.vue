<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useVinyls } from '@/stores/useVinyls'
import SearchCard from '@/components/SearchCard/SearchCard.vue'
import { VinylsService, type Vinyl } from '@/services/vinyls.service'
import { VinylUtils } from '@/utils/array.utils'
import BarLetter from '@/components/BarLetter/BarLetter.vue'
import VinylModal from '@/components/VinylModal/VinylModal.vue'

const vinylsStore = useVinyls()

const currentLetter = ref('')
const currentVinyl = ref<Vinyl | null>(null)

type ModalTypes = 'none' | 'open'
const modalState = ref<ModalTypes>('none')

const mappedVinyls = computed(() => {
  return VinylUtils.mapVinylsByArtists(vinylsStore.vinyls)
})

async function fetchVinyls() {
  const newVinyls = await VinylsService.getVinyls()
  vinylsStore.updateVinyls(newVinyls)
}

function selectVinyl(vinyl: Vinyl) {
  currentVinyl.value = vinyl
  modalState.value = 'open'
}

onMounted(() => {
  fetchVinyls()
})
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <div :class="$style.header">
        <h1 :class="$style.title">Bem vindo, Lohan!</h1>

        <button v-show="currentLetter !== ''" @click="currentLetter = ''">Limpar filtro</button>
      </div>

      <BarLetter v-model="currentLetter" />

      <div :class="$style['vinyls-wrapper']">
        <template v-if="currentLetter === ''">
          <SearchCard
            @click="selectVinyl"
            v-for="vinyl in vinylsStore.vinyls"
            :key="vinyl.externalId"
            :album="vinyl"
          />
        </template>
        <template v-else>
          <SearchCard
            v-for="vinyl in mappedVinyls.get(currentLetter)"
            :key="vinyl.externalId"
            @click="selectVinyl"
            :album="vinyl"
          />
        </template>
        <VinylModal
          v-if="modalState === 'open'"
          @close="modalState = 'none'"
          :album="currentVinyl!"
        />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #222;
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1.title {
      color: #fff;
      font-size: 32px;
      text-align: center;
      align-self: flex-start;
    }

    button {
      padding: 8px 16px;
      color: #222;
      font-weight: 600;
      background-color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .vinyls-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
