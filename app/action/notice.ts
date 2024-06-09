'use server'

import { api } from '@/lib/utils'
import { ActionType } from './type'

export const createNotice = async ({
  shopId,
  hourlyPay,
  startsAt,
  workhour,
  description,
}: {
  shopId: string
  hourlyPay: number
  startsAt: string
  workhour: number
  description: string
}): Promise<ActionType> => {
  try {
    await api.post(`/shops/${shopId}/notices`, {
      hourlyPay,
      startsAt,
      workhour,
      description,
    })

    return { success: true, message: '공고 생성에 성공하였습니다.' }
  } catch (error) {
    console.log(error)
    return { success: false, message: '공고 생성에 실패하였습니다.' }
  }
}
