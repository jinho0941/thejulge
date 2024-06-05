import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Circle, CircleCheck } from 'lucide-react'

type Props = {
  isSelected: boolean
  onClick: () => void
}

export const SelectUserTypeButton = ({ isSelected, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant={'outline'}
      size={'xl'}
      className={cn(
        'rounded-full text-gray-500',
        isSelected && 'border-orange-500',
      )}
    >
      {isSelected ? <CircleCheck className='text-orange-500' /> : <Circle />}
      <span className='ml-2'>알바님</span>
    </Button>
  )
}
