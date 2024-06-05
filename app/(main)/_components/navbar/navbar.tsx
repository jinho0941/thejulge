import { Logo } from './logo'
import { SearchBar } from './search-bar'

export const Navbar = async () => {
  return (
    <nav className='w-full xl:max-w-5xl xl:mx-auto xl:px-0 px-8 h-14 fixed bg-white'>
      <div className='flex items-center h-full'>
        <Logo />
        <SearchBar />
        {/* <AuthOptions /> */}
      </div>
    </nav>
  )
}
