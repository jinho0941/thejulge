import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const AuthOptions = () => {
  return (
    <div className='flex items-center justify-end'>
      <Button variant={'ghost'} asChild>
        <Link href={'/sign-in'}>로그인</Link>
      </Button>
      <span>/</span>
      <Button variant={'ghost'} asChild>
        <Link href={'/sign-up'}>회원가입</Link>
      </Button>
    </div>
  )
}
