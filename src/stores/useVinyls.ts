import { defineStore } from 'pinia'
import { type Vinyl } from '@/services/vinyls.service'

interface VinylsState {
  vinyls: Vinyl[]
}

export const useVinyls = defineStore('vinyls', {
  state: (): VinylsState => {
    return {
      vinyls: []
    }
  },
  actions: {
    updateVinyls(newVinyls: Vinyl[]) {
      this.vinyls = newVinyls
    }
  }
})
