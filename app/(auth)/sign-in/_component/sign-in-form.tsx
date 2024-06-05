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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { login } from '@/app/action/user'

export const formSchema = z.object({
  email: z.string().email({
    message: '이메일 형식으로 입력해 주세요.',
  }),
  password: z.string().min(8, {
    message: '8자 이상 입력해 주세요.',
  }),
})

export const SignInForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'test1@mail.com',
      password: 'test1234',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { email, password } = values

      const { success, message } = await login({ email, password })

      if (!success) {
        toast.error(message)
        return
      }

      toast.success(message)
      // router.push('/')
    })
  }

  const formFields: {
    name: keyof z.infer<typeof formSchema>
    label: string
    placeholder: string
  }[] = [
    {
      name: 'email',
      label: '이메일',
      placeholder: '이메일을 입력해 주세요.',
    },
    {
      name: 'password',
      label: '비밀번호',
      placeholder: '8자 이상 입력해 주세요.',
    },
  ]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-8 flex w-full flex-col gap-y-5'
      >
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: inputField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={field.placeholder}
                    {...inputField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={!form.formState.isValid || isPending}
          type='submit'
          className='mt-5 h-12 w-full'
        >
          {isPending ? '로그인중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
