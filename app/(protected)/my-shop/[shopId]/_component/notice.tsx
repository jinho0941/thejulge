import { getNotices } from '@/app/data/notice'
import { NoNotice } from './no-notice'
import { HasNotice } from './has-notice'

type Props = {
  shopId: string
  shopImg: string
  shopName: string
  shopLocation: string
}

export const Notices = async ({
  shopId,
  shopImg,
  shopName,
  shopLocation,
}: Props) => {
  const noticeRes = await getNotices({ shopId })
  if (!noticeRes) return

  const notices = noticeRes.items
  if (!notices) {
    return <NoNotice />
  }

  return (
    <HasNotice
      notices={notices}
      shopId={shopId}
      shopImg={shopImg}
      shopName={shopName}
      shopLocation={shopLocation}
    />
  )
}
