type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className='flex h-screen items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col items-center'>
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
