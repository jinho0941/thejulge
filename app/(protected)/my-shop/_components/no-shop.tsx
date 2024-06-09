import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const NoShop = () => {
  return (
    <Container>
      <div className='mt-20'>
        <h1 className='font-bold text-2xl'>내 가게</h1>
        <div className='border rounded-lg mt-8 flex py-20 flex-col items-center gap-y-8'>
          <p>내 가게를 소개하고 공고도 등록해 보세요.</p>
          <Button className='w-[350px]' size={'xl'} asChild>
            <Link href={'/my-shop/create'}>
              <span className='font-bold text-base'>내 가게 등록하기</span>
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
