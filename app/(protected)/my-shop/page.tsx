import { getCurrentUserId } from '@/app/action/user'
import { getUserById } from '@/app/data/user'
import { redirect } from 'next/navigation'
import { NoShop } from './_components/no-shop'

const MyStorePage = async () => {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/sign-in')

  const user = await getUserById({ userId })
  if (!user) return redirect('/sign-in')

  const shop = user.shop

  if (!shop) {
    return <NoShop />
  }

  return redirect(`/my-shop/${shop.item.id}`)
}

export default MyStorePage
