'use server'

import { api } from '@/lib/utils'
import { ActionType } from './type'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

const setCurrentUserId = async (id: string) => {
  cookies().set('userId', id)
}

const setAccessToken = async (data: string) => {
  cookies().set('accessToken', data)
}

export const getCurrentUserId = async () => {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')

  if (!userId) return null

  return userId.value
}

export const getAccessToken = async (): Promise<string | null> => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) return null

  return accessToken.value
}

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<ActionType> => {
  try {
    const res = await api.post('/token', { email, password })
    const data = res.data
    const { token } = data.item
    const { id } = res.data.item.user.item

    Promise.all([setAccessToken(token), setCurrentUserId(id)])

    return { success: true, message: '로그인에 성공 하였습니다.' }
  } catch (error) {
    return { success: false, message: '로그인에 실패 하였습니다.' }
  }
}

export const register = async ({
  email,
  password,
  type,
}: {
  email: string
  password: string
  type: string
}): Promise<ActionType> => {
  try {
    await api.post('/users', { email, password, type })

    return { success: true, message: '회원가입에 성공 하였습니다.' }
  } catch (error) {
    return { success: false, message: '회원가입에 실패 하였습니다.' }
  }
}

export const logout = async (): Promise<void> => {
  const cookieStore = cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('userId')
}
