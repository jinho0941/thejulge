export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='pt-16 h-screen'>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 md:px-8 px-4'>
        {children}
      </div>
    </div>
  )
}
