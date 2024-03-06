/**
 * Utility class for manipulating text.
 */
export class TextUtils {
  /**
   * Returns an array of the first letters of the given texts.
   *
   * @param {...string} text - The texts to extract the first letters from.
   * @returns {string[]} An array of the first letters.
   */
  static firstLetter(text: string): string {
    return text.charAt(0)
  }

  static isLetter(text: string): boolean {
    const regex = /[a-zA-Z]/
    return regex.test(text)
  }

  /**
   * Capitalizes the first letter of a text.
   *
   * @param {string} text - The text to capitalize the first letter of.
   * @returns {string} The text with the first letter capitalized.
   */
  static firstLetterUppercase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
