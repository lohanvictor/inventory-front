<script setup lang="ts">
import { onMounted } from 'vue'
import { useVinyls } from '@/stores/useVinyls'
import SearchCard from '@/components/SearchCard/SearchCard.vue'
import { VinylsService } from '@/services/vinyls.service'

const vinylsStore = useVinyls()

// const currentVinyls = ref()

async function fetchVinyls() {
  const newVinyls = await VinylsService.getVinyls()
  vinylsStore.updateVinyls(newVinyls)
}

onMounted(() => {
  fetchVinyls()
})
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <h1 :class="$style.title">Bem vindo, Lohan!</h1>

      <div :class="$style['vinyls-wrapper']">
        <SearchCard v-for="vinyl in vinylsStore.vinyls" :key="vinyl.externalId" :album="vinyl" />
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
  gap: 8px;
  padding: 16px;
  width: 100%;
  height: 100%;

  h1.title {
    color: #fff;
    font-size: 32px;
    text-align: center;
    align-self: flex-start;
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
