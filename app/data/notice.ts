import { api } from '@/lib/utils'
import { NoticesResponse } from '@/model'

export const getNotices = async ({ shopId }: { shopId: string }) => {
  try {
    const response = await api.get<NoticesResponse>(`/shops/${shopId}/notices`)
    const data = response.data

    return data
  } catch (error) {
    return null
  }
}

export const getNoticeById = async ({
  shopId,
  noticeId,
}: {
  shopId: string
  noticeId: string
}) => {
  try {
    const url = `/shops/${shopId}/notices/${noticeId}`
    const response = await api.get(`/shops/${shopId}/notices/${noticeId}`)
    const data = response.data
  } catch (error) {
    return null
  }
}
