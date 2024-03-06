import type { Vinyl } from '@/services/vinyls.service'
import { TextUtils } from './text.utils'

/**
 * Utility class for working with arrays.
 */
export class VinylUtils {
  static mapVinylsByArtists(vinyls: Vinyl[]): Map<string, Vinyl[]> {
    const mapVinyls = new Map<string, Vinyl[]>()
    vinyls.forEach((vinyl) => {
      const firstLetters = vinyl.artists.map((artist) =>
        TextUtils.firstLetter(artist.name).toUpperCase()
      )
      firstLetters.forEach((letter) => {
        if (TextUtils.isLetter(letter)) {
          if (mapVinyls.has(letter)) {
            mapVinyls.get(letter)?.push(vinyl)
          } else {
            mapVinyls.set(letter, [vinyl])
          }
        } else {
          const notLetter = '#'
          if (mapVinyls.has(notLetter)) {
            mapVinyls.get(notLetter)?.push(vinyl)
          } else {
            mapVinyls.set(notLetter, [vinyl])
          }
        }
      })
    })
    return mapVinyls
  }
}
