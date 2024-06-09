import React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

type Props = {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const Combobox = ({
  options,
  value,
  onChange,
  open,
  setOpen,
}: Props) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className=' justify-between h-16 w-full'
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : '옵션을 선택해주세요.'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[500px]'>
        <Command className='w-full'>
          <CommandInput placeholder='검색하기' />
          <CommandList>
            <CommandEmpty>검색할 데이터가 없습니다.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
