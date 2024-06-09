import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const NoNotice = () => {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <p className='text-xl font-medium'>공고를 등록해 보세요.</p>
      <Button size={'xl'} className='w-[350px]' asChild>
        <Link href={'/my-store/notices'}>공고 등록하기</Link>
      </Button>
    </div>
  )
}
