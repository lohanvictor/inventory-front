import { api } from '@/lib/api'
import type { Vinyl } from './vinyls.service'

export interface GetAlbumsRequest {
  name: string
  page: number
  pageSize: number
}

export class AlbumsService {
  static async getAlbums(params: GetAlbumsRequest): Promise<Vinyl[]> {
    return (await api.get<Vinyl[]>('/albums/filter', { params })).data
  }
}
