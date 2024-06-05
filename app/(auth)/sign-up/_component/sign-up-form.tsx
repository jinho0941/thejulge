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
import { useState, useTransition } from 'react'
import { SelectUserTypeButton } from './select-user-type-button'
import { register } from '@/app/action/user'

export const formSchema = z
  .object({
    email: z.string().email({
      message: '이메일 형식으로 입력해 주세요.',
    }),
    password: z.string().min(8, {
      message: '8자 이상 입력해 주세요.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export const SignUpForm = () => {
  const router = useRouter()
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { email, password } = values
      const type = userType

      const { success, message } = await register({ email, password, type })

      if (!success) {
        toast.error(message)
        return
      }

      toast.success(message)
      router.push('/sign-in')
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
    {
      name: 'confirmPassword',
      label: '비밀번호 확인',
      placeholder: '비밀번호를 한번 더 입력해 주세요.',
    },
  ]

  const selectEmployee = () => {
    setUserType('employee')
  }

  const selectEmployer = () => {
    setUserType('employer')
  }

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
        <span>회원 유형</span>
        <div className='grid grid-cols-2 gap-x-4'>
          <SelectUserTypeButton
            isSelected={userType === 'employee'}
            onClick={selectEmployee}
          />
          <SelectUserTypeButton
            isSelected={userType === 'employer'}
            onClick={selectEmployer}
          />
        </div>
        <Button
          disabled={!form.formState.isValid || isPending}
          type='submit'
          className='mt-5 h-12 w-full'
        >
          {isPending ? '회원가입 중...' : '가입하기'}
        </Button>
      </form>
    </Form>
  )
}
