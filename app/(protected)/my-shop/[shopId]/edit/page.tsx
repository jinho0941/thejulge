import { Container } from '@/components/container'
import { EditStoreForm } from './_components/edit-store-form'
import { getShopsByShopId } from '@/app/data/shop'
import { redirect } from 'next/navigation'

const EditStorePage = async ({ params }: { params: { shopId: string } }) => {
  const shopId = params.shopId
  const shop = await getShopsByShopId({ shopId })
  if (!shop) redirect('/')

  return (
    <Container>
      <div className='md:mt-10 mt-5'>
        <h1 className='font-bold text-2xl'>가게 정보</h1>
        <EditStoreForm
          id={shop.id}
          name={shop.name}
          category={shop.category}
          address={shop.address1}
          fullAddress={shop.address2}
          pay={shop.originalHourlyPay.toString()}
          description={shop.description}
          imgUrl={shop.imageUrl}
        />
      </div>
    </Container>
  )
}

export default EditStorePage
