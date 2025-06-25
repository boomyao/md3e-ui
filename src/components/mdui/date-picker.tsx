import { Calendar } from './calendar'
import { TextField } from './text-field'
import { Popover, PopoverTrigger, PopoverContent, PopoverPortal } from '@radix-ui/react-popover'
import { TodayIcon } from './icons'
import { useState } from 'react'
import { IconButton } from './icon-button'

export const DatePicker = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <TextField className='w-90' readOnly variant="outlined" label="Date" supportingText='MM/DD/YYYY' value={date.toLocaleDateString()} trailingIcon={<IconButton><TodayIcon /></IconButton>} />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent sideOffset={45} align='start'>
          <Calendar 
            selectedDate={date}
            onDateSelect={setDate}
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}