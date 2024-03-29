<script setup lang="ts">
import Loading from '@/components/Loading/Loading.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import SearchCard from '@/components/SearchCard/SearchCard.vue'
import { AlbumsService, type GetAlbumsRequest } from '@/services/albums.service'
import type { Vinyl } from '@/services/vinyls.service'
import { computed, ref } from 'vue'

const albums = ref<Vinyl[]>([])
const currentPage = ref(1)
const filterValue = ref('')
const PAGE_SIZE = 10

const isLoading = ref(false)
const hasAlbums = computed(() => {
  return Boolean(albums.value.length)
})

async function search() {
  if (isLoading.value) return
  try {
    isLoading.value = true
    const request: GetAlbumsRequest = {
      page: currentPage.value,
      pageSize: PAGE_SIZE,
      name: filterValue.value
    }
    const response = await AlbumsService.getAlbums(request)
    albums.value = response
  } finally {
    isLoading.value = false
  }
}

async function onSearch() {
  currentPage.value = 1
  await search()
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <div :class="$style.search">
        <input
          @keydown="({ key }) => key === 'Enter' && onSearch()"
          v-model="filterValue"
          type="text"
          placeholder="Escreva o nome do album"
        />
        <button @click="onSearch">
          <span>Buscar</span>
        </button>
      </div>

      <div :class="{ [$style.albums]: true, [$style.loading]: isLoading }">
        <Loading v-if="isLoading" :class="$style.loading" color="#fff" size="64px" />
        <SearchCard v-else v-for="album in albums" :key="album.externalId" :album="album" />
      </div>

      <Pagination v-if="hasAlbums" v-model="currentPage" @change-page="search" />
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  flex: 1;
  max-height: 100%;
  overflow-y: auto;

  background-color: #222;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
  height: 100%;
}
.search {
  width: 100%;
  display: flex;
  gap: 16px;

  input {
    padding: 16px;
    border-radius: 8px;
    border: none;
    background-color: #fff;
    width: 100%;
  }
  button {
    cursor: pointer;
    width: 128px;
    text-align: center;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.2s;

    &:hover {
      background-color: #dadada;
    }
  }
}
.albums {
  max-height: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding-right: 8px;

  .loading {
    align-self: center;
    justify-self: center;
  }

  &.loading {
    justify-content: center;
  }
}
</style>
