'use client'

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { createNotice } from '@/app/action/notice'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  pay: z.string(),
  date: z.string(),
  time: z.string(),
  description: z
    .string()
    .min(2, { message: '최소 2글자 이상입니다' })
    .max(150, { message: '최대 150 글자까지 입니다.' }),
})

type Props = {
  shopId: string
}

export const CreateNoticeForm = ({ shopId }: Props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      pay: '',
      date: '',
      time: '',
      description: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { pay, date, time, description } = values
    startTransition(async () => {
      const { success, message } = await createNotice({
        shopId,
        hourlyPay: Number(pay),
        startsAt: date,
        workhour: Number(time),
        description,
      })
      if (!success) {
        toast.error(message)
        return
      }
      toast.success(message)
      router.push('/my-store')
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid md:grid-cols-3 grid-cols-1 md:gap-x-8 mt-12 gap-y-8'
      >
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
        <FormItem>
          <FormLabel className='text-lg'>날짜</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                type='button'
                className={cn(
                  'w-full h-16 justify-start text-left font-normal',
                  !form.watch('date') && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {form.watch('date') ? (
                  format(form.watch('date'), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                // @ts-ignore
                selected={form.watch('date')}
                onSelect={(date: any) => {
                  form.setValue('date', date.toISOString())
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg'>시간*</FormLabel>
              <FormControl>
                <Input
                  className='appearance-none'
                  placeholder='시간'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='md:col-span-3'>
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

        <div className='md:col-span-3 flex justify-center md:gap-x-8 gap-x-2'>
          <Button
            variant={'destructive'}
            type='button'
            size={'xl'}
            className='w-[350px] font-bold text-base'
            asChild
          >
            <Link href={'/my-store'}>취소하기</Link>
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
