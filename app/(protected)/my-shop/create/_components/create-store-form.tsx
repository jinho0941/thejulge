'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRef, useState, useTransition } from 'react'
import { Combobox } from '@/components/ui/combobox'
import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { createShop } from '@/app/action/shop'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '가게 이름은 최소 2글자 이상입니다.' })
    .max(20, { message: '가게 이름은 최대 20글자 입니다.' }),
  category: z.string(),
  address: z.string(),
  fullAddress: z.string().min(1, { message: '상세 주소를 입력해 주세요.' }),
  pay: z.string().min(1, '기본 시급을 입력해 주세요.'),
  description: z
    .string()
    .min(1, '가게 설명을 입력해 주세요.')
    .max(350, '가게 설명은 최대 350글자 입니다.'),
  imgUrl: z.string().optional(),
})

const addresses = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
] as const

const addressOptions = addresses.map((address) => ({
  value: address,
  label: address,
}))

const categories = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '카페',
  '편의점',
  '기타',
] as const

const categoryOptions = categories.map((category) => ({
  value: category,
  label: category,
}))

export const CreateStoreForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      category: '',
      address: '',
      fullAddress: '',
      pay: '0',
      description: '',
      imgUrl: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    if (file) formData.append('image', file)
    const { address, category, description, fullAddress, name, pay, imgUrl } =
      values
    console.log(imgUrl)
    startTransition(async () => {
      const { success, message } = await createShop({
        address1: address,
        address2: fullAddress,
        category,
        description,
        name,
        originalHourlyPay: Number(pay),
        formData,
      })
      if (!success) {
        toast.error(message)
        return
      }

      toast.success(message)
      router.push('/my-shop')
    })
  }

  const [openAddress, setOpenAddress] = useState(false)
  const [openCategories, setOpenCategories] = useState(false)
  const [file, setFile] = useState<File | undefined>()

  const url = form.watch('imgUrl')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      form.setValue('imgUrl', URL.createObjectURL(selectedFile))
      setFile(selectedFile)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid md:grid-cols-2 grid-cols-1 md:gap-x-8 mt-12 gap-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>가게 이름*</FormLabel>
              <FormControl>
                <Input placeholder='가게 이름' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className='text-lg'>분류*</FormLabel>
          <Combobox
            options={categoryOptions}
            value={form.watch('category')}
            onChange={(newValue) => form.setValue('category', newValue)}
            open={openCategories}
            setOpen={setOpenCategories}
          />
        </FormItem>
        <FormItem>
          <FormLabel className='text-lg'>주소*</FormLabel>
          <Combobox
            options={addressOptions}
            value={form.watch('address')}
            onChange={(newValue) => form.setValue('address', newValue)}
            open={openAddress}
            setOpen={setOpenAddress}
          />
        </FormItem>

        <FormField
          control={form.control}
          name='fullAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>상세 주소*</FormLabel>
              <FormControl>
                <Input placeholder='상세 주소' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='pay'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>기본 시급*</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  className='appearance-none'
                  placeholder='기본 시급'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='max-w-[300px] md:col-span-2'>
          <span className='text-base'>가게 이미지</span>
          <div className='mt-4 border rounded-lg aspect-square relative'>
            {url ? (
              <Image
                src={url}
                alt='userImg'
                fill
                sizes='100vw 50vw'
                className='cursor-pointer object-cover transition-all hover:brightness-75'
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <Button
                type='button'
                className='h-full w-full bg-stone-200 hover:bg-stone-300'
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className='h-14 w-14 text-black' />
                <span></span>
              </Button>
            )}
          </div>
        </div>
        <Input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className='text-lg'>가게 설명*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='가게 설명'
                  className='resize-none h-40'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='md:col-span-2 flex justify-center md:gap-x-8 gap-x-2'>
          <Button
            variant={'destructive'}
            type='button'
            size={'xl'}
            className='w-[350px] font-bold text-base'
            asChild
          >
            <Link href={'/my-shop'}>취소하기</Link>
          </Button>
          <Button
            type='submit'
            size={'xl'}
            className='w-[350px] font-bold text-base'
            disabled={!form.formState.isValid || isPending}
          >
            완료하기
          </Button>
        </div>
      </form>
    </Form>
  )
}
