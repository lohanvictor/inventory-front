import { api } from '@/lib/api'

export interface Artist {
  name: string
  externalId: string
}

export interface Vinyl {
  externalId: string
  name: string
  cover: string
  year: number
  artists: Artist[]
  tracks: { name: string; position: string; side: string }[]
}

export class VinylsService {
  static async getVinyls(): Promise<Vinyl[]> {
    return (await api.get<Vinyl[]>('/vinyls')).data
  }

  static async addVinyl(vinyl: Vinyl): Promise<Vinyl> {
    return (await api.post<Vinyl>('/vinyls', vinyl)).data
  }

  static async deleteVinyl(vinylId: string): Promise<void> {
    await api.delete(`/vinyls/${vinylId}`)
  }
}
