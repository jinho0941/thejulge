import { Navbar } from '@/components/navbar/navbar'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default ProtectedLayout
