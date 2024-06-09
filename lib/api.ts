'use server'

// server instance
import { getAccessToken } from '@/app/action/user'
import axios from 'axios'

export const serverApi = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/5-1/the-julge',
})

serverApi.interceptors.request.use(
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

// client instance

export const clientApi = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/5-1/the-julge',
})
