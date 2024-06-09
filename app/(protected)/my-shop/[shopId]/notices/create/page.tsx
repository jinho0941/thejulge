import { Container } from '@/components/container'
import { CreateNoticeForm } from './_components/create-notice-form'
import { getCurrentUserId } from '@/app/action/user'
import { redirect } from 'next/navigation'
import { getUserById } from '@/app/data/user'

const NoticePage = async () => {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/sign-in')

  const user = await getUserById({ userId })
  if (!user) return redirect('/sign-in')

  const shop = user.shop
  if (!shop) return redirect('/my-shop')

  return (
    <Container>
      <div className='mt-20'>
        <h1 className='text-3xl font-bold'>공고 등록</h1>
        <CreateNoticeForm shopId={shop.item.id} />
      </div>
    </Container>
  )
}

export default NoticePage
