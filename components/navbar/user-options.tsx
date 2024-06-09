'use client'

import { logout } from '@/app/action/user'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const UserOptions = () => {
  const router = useRouter()

  const onLogoutClick = async () => {
    await logout()
    router.push('/')
  }
  return (
    <div className='flex items-center justify-end'>
      <Button variant={'ghost'} asChild>
        <Link href='/my-shop'>내 가게</Link>
      </Button>
      <Button
        onClick={onLogoutClick}
        variant={'ghost'}
        className='md:block hidden'
      >
        로그아웃
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <Bell />
      </Button>
    </div>
  )
}
