import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Notice } from '@/model'
import { addHours, format } from 'date-fns'
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  notices: Notice[]
  shopId: string
  shopImg: string
  shopName: string
  shopLocation: string
}

export const HasNotice = ({
  notices,
  shopId,
  shopImg,
  shopName,
  shopLocation,
}: Props) => {
  return (
    <ul className='grid lg:grid-cols-3 sm:grid-cols-2 gird-cols-1 gap-x-4 gap-y-4'>
      {notices.map((notice) => (
        <Link
          href={`/my-shop/${shopId}/notices/${notice.item.id}`}
          key={notice.item.id}
        >
          <Card>
            <CardHeader>
              <div className='h-[200px] relative aspect-video bg-slate-200 rounded-lg'>
                <Image
                  src={shopImg}
                  alt={'shop img'}
                  fill
                  sizes=''
                  className='object-cover rounded-lg'
                />
              </div>
              <CardTitle className='pt-6'>{shopName}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
                <Clock />
                <span>{format(notice.item.startsAt, 'yyyy-MM-dd HH:mm')}</span>~
                <span>
                  {format(
                    addHours(notice.item.startsAt, notice.item.workhour),
                    'HH:mm',
                  )}
                </span>
                <span>({notice.item.workhour}시간)</span>
              </div>
              <div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
                <MapPin />
                <span>{shopLocation}</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className='truncate text-2xl font-bold'>
                {notice.item.hourlyPay}원
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </ul>
  )
}
