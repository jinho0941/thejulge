import { getAccessToken } from '@/app/action/user'
import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/5-1/the-julge',
})

const isServer = () => typeof window === 'undefined'

if (isServer()) {
  api.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
