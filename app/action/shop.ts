'use server'

import { api } from '@/lib/utils'
import { ActionType } from './type'
import { revalidatePath } from 'next/cache'
import axios from 'axios'

export const createShop = async ({
  name,
  category,
  address1,
  address2,
  description,
  originalHourlyPay,
  formData,
}: {
  name: string
  category: string
  address1: string
  address2: string
  description: string
  imageUrl?: string
  originalHourlyPay: number
  formData: FormData
}): Promise<ActionType> => {
  try {
    const file = formData.get('image') as File
    const presignedUrlRes = await api.post('/images', { name: file.name })
    const presignedUrl = presignedUrlRes.data.item.url

    const blob = new Blob([file], { type: file.type })
    await axios.put(presignedUrl, blob)

    const url = presignedUrl.split('?')[0]

    await api.post('/shops', {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl: url,
      originalHourlyPay,
    })

    revalidatePath('/my-shop/[shopId]', 'page')

    return { success: true, message: '가게 생성에 성공 하였습니다.' }
  } catch (error) {
    console.log(error)
    return { success: false, message: '가게 생성에 실패 하였습니다.' }
  }
}

export const editShop = async ({
  shopId,
  name,
  category,
  address1,
  address2,
  description,
  originalHourlyPay,
  formData,
}: {
  shopId: string
  name: string
  category: string
  address1: string
  address2: string
  description: string
  originalHourlyPay: number
  formData: FormData
}): Promise<ActionType> => {
  const file = formData.get('image') as File
  const presignedUrlRes = await api.post('/images', { name: file.name })
  const presignedUrl = presignedUrlRes.data.item.url

  const blob = new Blob([file], { type: file.type })
  await axios.put(presignedUrl, blob)

  const url = presignedUrl.split('?')[0]

  try {
    await api.put(`/shops/${shopId}`, {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl: url,
      originalHourlyPay,
    })

    revalidatePath('/my-shop/[shopId]', 'page')

    return { success: true, message: '가게 수정에 성공 하였습니다.' }
  } catch (error) {
    console.log(error)
    return { success: false, message: '가게 수정에 실패 하였습니다.' }
  }
}
