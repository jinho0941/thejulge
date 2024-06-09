import { api } from '@/lib/utils'
import { User, UserRes } from '@/model'

export const getUserById = async ({
  userId,
}: {
  userId: string
}): Promise<User | null> => {
  try {
    const res = await api.get<UserRes>(`/users/${userId}`)
    const data = res.data

    return data.item
  } catch (error) {
    return null
  }
}
