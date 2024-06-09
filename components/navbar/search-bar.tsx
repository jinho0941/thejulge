import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export const SearchBar = () => {
  return (
    <div className='relative text-gray-400 flex-1 md:flex-none'>
      <Input
        className='h-8 pl-10 bg-orange-50'
        placeholder='가게 이름으로 찾아보세요'
      />
      <Search className='absolute left-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2' />
    </div>
  )
}
