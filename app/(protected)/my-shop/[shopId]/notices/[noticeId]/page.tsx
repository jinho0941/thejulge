import { getNoticeById } from '@/app/data/notice'
import { getShopsByShopId } from '@/app/data/shop'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const NoticeIdPage = async ({
  params,
}: {
  params: { shopId: string; noticeId: string }
}) => {
  const { shopId, noticeId } = params

  const shop = await getShopsByShopId({ shopId })
  if (!shop) redirect('/')

  const notice = await getNoticeById({ shopId, noticeId })

  return (
    <Container>
      <div className='mt-20'>
        <h1 className='text-2xl font-bold'>내 가게</h1>
        <div className='bg-orange-50 rounded-xl p-10 flex sm:flex-row flex-col mt-8 gap-x-4'>
          <div className='relative md:h-[320px] h-32 aspect-video bg-slate-200 rounded-xl'>
            <Image
              src={shop.imageUrl}
              alt={'shop img'}
              fill
              sizes=''
              className='object-cover rounded-xl'
            />
          </div>
          <div className='py-5 space-y-4 flex-1'>
            <h3 className='text-lg text-orange-600 font-bold'>
              {shop.category}
            </h3>
            <h2 className='text-3xl font-bold'>{shop.name}</h2>
            <div className='flex items-center gap-x-2'>
              <MapPin className='text-orange-600' />
              <span className='text-muted-foreground'>{shop.address1}</span>
            </div>
            <p>{shop.address2}</p>
            <div className='w-full pt-10'>
              <Button
                variant={'outline'}
                size={'xl'}
                asChild
                className='w-full'
              >
                <Link href={`/my-shop/${shop.id}/edit`}>공고 편집하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default NoticeIdPage
