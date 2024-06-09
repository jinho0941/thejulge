import { Container } from '@/components/container'
import { CreateStoreForm } from './_components/create-store-form'

const CreateStorePage = () => {
  return (
    <Container>
      <div className='md:mt-10 mt-5'>
        <h1 className='font-bold text-2xl'>가게 정보</h1>
        <CreateStoreForm />
      </div>
    </Container>
  )
}

export default CreateStorePage
