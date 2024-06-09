import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href={'/'}>
      <Button variant={'ghost'} className='md:block hidden'>
        logo
      </Button>
    </Link>
  )
}
