import { getCurrentUserId } from '@/app/action/user'
import { AuthOptions } from './auth-options'
import { Logo } from './logo'
import { SearchBar } from './search-bar'
import { UserOptions } from './user-options'

export const Navbar = async () => {
  const userId = await getCurrentUserId()
  const isLoggedIn = !!userId

  return (
    <nav className='w-full fixed bg-white shadow-sm z-20'>
      <div className='md:grid md:grid-cols-3 flex items-center xl:max-w-5xl xl:mx-auto xl:px-0 md:px-8 px-4 h-16'>
        <Logo />
        <SearchBar />
        {isLoggedIn ? <UserOptions /> : <AuthOptions />}
      </div>
    </nav>
  )
}
