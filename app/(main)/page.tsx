import { Button } from '@/components/ui/button'
import { getCurrentUserId, logout } from '../action/user'

const HomePage = async () => {
  const userId = await getCurrentUserId()
  console.log(userId)
  return <main className='pt-14'></main>
}

export default HomePage
