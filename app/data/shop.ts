import { api } from '@/lib/utils'
import { ShopItem, ShopRes } from '@/model'

export const getShopsByShopId = async ({
  shopId,
}: {
  shopId: string
}): Promise<ShopItem | null> => {
  try {
    const res = await api.get<ShopRes>(`/shops/${shopId}`)
    const data = res.data.item

    return data
  } catch (error) {
    return null
  }
}
