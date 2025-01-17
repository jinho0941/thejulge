import { Navbar } from '@/components/navbar/navbar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default MainLayout
