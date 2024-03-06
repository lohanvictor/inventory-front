import axios from 'axios'

declare global {
  interface ImportMeta {
    readonly VITE_API_URL: string
  }
}

const baseUrl = import.meta.VITE_API_URL || 'http://localhost:8998'

export const api = axios.create({
  baseURL: baseUrl
})
