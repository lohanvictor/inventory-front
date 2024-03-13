<script setup lang="ts">
import type { Vinyl } from '@/services/vinyls.service'
import { computed, ref } from 'vue'
const props = defineProps<Props>()
defineEmits<Emits>()
interface Props {
  album: Vinyl
}
interface Emits {
  (event: 'close'): void
}

const artists = computed(() => {
  return props.album.artists.map((artist) => artist.name).join(', ') ?? ''
})
const backgroundImage = computed(() => {
  return `url(${props.album.cover})`
})

const sides = computed(() => {
  return props.album.tracks.reduce((map, track) => {
    const trackName = track.position + ' - ' + track.name
    if (map.has(track.side)) {
      map.get(track.side)?.push(trackName)
    } else {
      map.set(track.side, [trackName])
    }
    return map
  }, new Map<string, string[]>())
})
</script>

<template>
  <Teleport to="#vinyls">
    <div :class="$style.backdrop">
      <div :class="$style.modal">
        <header :class="$style.header">
          <span>{{ props.album.name }}</span>
          <button @click="$emit('close')">X</button>
        </header>
        <div :class="$style.content">
          <div :class="$style['general-info']">
            <div :class="$style['img-wrapper']">
              <div :class="$style.img" :style="{ backgroundImage }"></div>
              <div :class="$style.vinyl"></div>
            </div>
            <div :class="$style.texts">
              <h2>{{ album?.name }}</h2>
              <p>{{ artists }}</p>
              <p>{{ album?.year }}</p>
            </div>
          </div>
          <div :class="$style['tracks-wrapper']">
            <div :class="$style['tracks-info']" v-for="side in sides.entries()" :key="side[0]">
              <div :class="$style.side">
                <span>{{ side[0] }}</span>
              </div>
              <div
                :class="$style.tracks"
                :style="{
                  'grid-template-rows': `repeat(${Math.ceil(side[1].length / 2)}, 1fr)`
                }"
              >
                <span v-for="track in side[1]" :key="track">
                  {{ track }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module lang="scss">
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);

  .modal {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
}

header.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #222;

  span {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }

  button {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
  }
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.general-info {
  display: flex;
  gap: 16px;
  width: 100%;

  .img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    transition: 0.2s;
    .img {
      width: 128px;
      height: 128px;
      background-size: cover;
      background-position: center;
      box-shadow: 0px 0px 5px 1px #222;
      z-index: 2;
    }

    @keyframes vinyl-coming {
      0%,
      40% {
        left: 0px;
      }
      50% {
        left: 20px;
      }
      60% {
        left: 13px;
      }
      65% {
        left: 20px;
      }
      70% {
        left: 15px;
      }
      73% {
        left: 20px;
      }
      75% {
        left: 17px;
      }
      76% {
        left: 20px;
      }
    }

    .vinyl {
      display: block;
      box-sizing: content-box;

      $border-width: 32px;

      width: calc(128px - 2 * $border-width);
      background-color: #4f4f4f;
      border: $border-width solid #222;

      aspect-ratio: 1;
      border-radius: 50%;
      position: absolute;
      left: 20px;
      animation: vinyl-coming;
      animation-duration: 0.6s;
      animation-timing-function: cubic-bezier(1, -0.02, 1, 0.38);

      transition: 0.6s;
    }
  }

  .texts {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
    margin-left: 20px;
    h2 {
      font-size: 24px;
      font-weight: bold;
      color: #222;
    }
  }
}

.tracks-info {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .side span {
    font-weight: bold;
    color: #222;
    font-size: 16px;
  }

  .tracks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    gap: 8px;
    width: 100%;

    span {
      line-height: 18px;
    }
  }
}
</style>
