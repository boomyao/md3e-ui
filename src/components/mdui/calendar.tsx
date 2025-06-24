import { useState, useMemo, useRef, useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { NavigateBeforeIcon, NavigateNextIcon, CheckIcon } from './icons'
import { Button } from './button'
import { IconButton } from './icon-button'
import { MenuButton } from './menu-button'
import { List, ListItem } from './lists'

// Types
interface CalendarCellData {
  date: number
  type: 'PREV_MONTH' | 'CURRENT_MONTH' | 'NEXT_MONTH' | 'SELECTED'
}

interface DateRange {
  start: Date | null
  end: Date | null
}

interface CalendarProps {
  selectedDate?: Date
  selectedRange?: DateRange
  mode?: 'single' | 'range'
  onDateSelect?: (date: Date) => void
  onRangeSelect?: (range: DateRange) => void
  onCancel?: () => void
  onConfirm?: (date?: Date, range?: DateRange) => void
  className?: string
}

// Constants
const COMPONENT_WIDTH = 48
const COMPONENT_HEIGHT = 48
const CONTAINER_SIZE = 40
const DAYS_OF_WEEK_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// 抽象出通用的交互状态样式
const getInteractionStates = (baseColor: string, opacity = '') => `
  hover:bg-${baseColor}/8${opacity} 
  focus-visible:bg-${baseColor}/10${opacity} 
  active:bg-${baseColor}/10${opacity}
`

const getPrimaryInteractionStates = () => `
  hover:bg-primary/92 
  focus-visible:bg-primary/90 
  active:bg-primary/90
`

// Calendar container styles
const calendarVariants = cva(
  'group rounded-medium bg-surface-container-high p-0 overflow-hidden',
  {
    variants: {},
    defaultVariants: {}
  }
)

// Calendar cell 外层容器样式
const cellContainerVariants = cva(
  'relative flex items-center justify-center transition-all duration-200',
  {
    variants: {
      cellType: {
        'default': '',
        'today': '',
        'selected': '',
        'range-start': '',
        'range-end': '',
        'range-middle': 'before:absolute before:inset-0 before:bg-secondary-container before:content-[""]',
        'range-single': '',
        'prev-next': '',
        'disabled': 'opacity-38'
      }
    },
    defaultVariants: {
      cellType: 'default'
    }
  }
)

// Calendar cell 内层容器样式 - 使用抽象的状态样式
const cellInnerVariants = cva(
  'relative flex items-center justify-center rounded-full transition-all duration-200 body-large',
  {
    variants: {
      cellType: {
        'default': `text-on-surface ${getInteractionStates('on-surface')}`,
        'today': `text-primary border border-primary ${getInteractionStates('primary')}`,
        'selected': `bg-primary text-on-primary ${getPrimaryInteractionStates()}`,
        'range-start': `bg-primary text-on-primary ${getPrimaryInteractionStates()}`,
        'range-end': `bg-primary text-on-primary ${getPrimaryInteractionStates()}`,
        'range-middle': `text-on-secondary-container relative z-10 ${getInteractionStates('on-surface')}`,
        'range-single': `bg-primary text-on-primary ${getPrimaryInteractionStates()}`,
        'prev-next': `text-on-surface-variant opacity-38 hover:opacity-100 focus-visible:opacity-100 active:opacity-100 ${getInteractionStates('on-surface')}`,
        'disabled': 'opacity-38 pointer-events-none'
      }
    },
    defaultVariants: {
      cellType: 'default'
    }
  }
)

// 范围高亮背景样式
const rangeHighlightVariants = cva(
  'absolute inset-0 bg-secondary-container',
  {
    variants: {
      position: {
        'start': 'rounded-l-full',
        'middle': '',
        'end': 'rounded-r-full'
      }
    }
  }
)

// 抽象的选择器组件
interface SelectorProps {
  label: string
  onPrev: () => void
  onNext: () => void
  onToggleOpen: () => void
  isDisabled?: boolean
  isInvisible?: boolean
}

const Selector = ({ label, onPrev, onNext, onToggleOpen, isDisabled, isInvisible }: SelectorProps) => (
  <div className="flex items-center">
    <IconButton
      className={isInvisible ? "group-data-[open-selector=true]:invisible" : ""}
      onClick={onPrev}
    >
      <NavigateBeforeIcon />
    </IconButton>
    <MenuButton
      onClick={onToggleOpen}
      disabled={isDisabled}
    >
      {label}
    </MenuButton>
    <IconButton
      className={isInvisible ? "group-data-[open-selector=true]:invisible" : ""}
      onClick={onNext}
    >
      <NavigateNextIcon />
    </IconButton>
  </div>
)

// 抽象的选择器列表组件
interface SelectorListProps<T> {
  items: T[]
  selectedItem: T
  onItemSelect: (item: T) => void
  getDisplayValue: (item: T) => string
  getKey: (item: T) => string | number
  className?: string
}

const SelectorList = <T,>({ 
  items, 
  selectedItem, 
  onItemSelect, 
  getDisplayValue, 
  getKey,
  className 
}: SelectorListProps<T>) => (
  <List className={cn('bg-transparent', className)}>
    {items.map((item) => (
      <ListItem
        key={getKey(item)}
        headline={getDisplayValue(item)}
        leadingElement={
          item === selectedItem ? <CheckIcon /> : <div className="w-6 h-6" />
        }
        onClick={() => onItemSelect(item)}
        data-selected={item === selectedItem}
        className='bg-transparent'
      />
    ))}
  </List>
)

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

// Helper function to check if a date is between two dates
function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end
}

// Helper function to generate calendar grid data
function generateCalendarGrid(year: number, month: number, selectedDate?: Date, selectedRange?: DateRange): CalendarCellData[][] {
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const grid: CalendarCellData[][] = []
  const currentDate = new Date(startDate)
  
  for (let week = 0; week < 6; week++) {
    const weekData: CalendarCellData[] = []
    for (let day = 0; day < 7; day++) {
      const isSelected = selectedDate && isSameDay(currentDate, selectedDate)
      const isInRange = selectedRange?.start && selectedRange?.end && 
        isDateInRange(currentDate, selectedRange.start, selectedRange.end)
      
      let type: CalendarCellData['type']
      if (isSelected || isInRange) {
        type = 'SELECTED'
      } else if (currentDate.getMonth() < month) {
        type = 'PREV_MONTH'
      } else if (currentDate.getMonth() > month) {
        type = 'NEXT_MONTH'
      } else {
        type = 'CURRENT_MONTH'
      }
      
      weekData.push({
        date: currentDate.getDate(),
        type
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    grid.push(weekData)
  }
  
  return grid
}

// Helper function to get cell type for styling
function getCellType(
  cellData: CalendarCellData, 
  today: Date, 
  currentYear: number, 
  currentMonth: number,
  mode: 'single' | 'range',
  selectedDate?: Date,
  selectedRange?: DateRange
): 'default' | 'today' | 'selected' | 'range-start' | 'range-end' | 'range-middle' | 'range-single' | 'prev-next' | 'disabled' {
  
  // Create date object for current cell
  let cellDate: Date
  if (cellData.type === 'PREV_MONTH') {
    cellDate = new Date(currentYear, currentMonth - 1, cellData.date)
  } else if (cellData.type === 'NEXT_MONTH') {
    cellDate = new Date(currentYear, currentMonth + 1, cellData.date)
  } else {
    cellDate = new Date(currentYear, currentMonth, cellData.date)
  }
  
  // Handle range mode
  if (mode === 'range' && selectedRange) {
    if (selectedRange.start && selectedRange.end) {
      if (isSameDay(cellDate, selectedRange.start) && isSameDay(cellDate, selectedRange.end)) {
        return 'range-single'
      } else if (isSameDay(cellDate, selectedRange.start)) {
        return 'range-start'
      } else if (isSameDay(cellDate, selectedRange.end)) {
        return 'range-end'
      } else if (isDateInRange(cellDate, selectedRange.start, selectedRange.end)) {
        return 'range-middle'
      }
    } else if (selectedRange.start && isSameDay(cellDate, selectedRange.start)) {
      return 'selected'
    }
  }
  
  // Handle single mode
  if (mode === 'single' && selectedDate && isSameDay(cellDate, selectedDate)) {
    return 'selected'
  }
  
  // Handle prev/next month dates
  if (cellData.type === 'PREV_MONTH' || cellData.type === 'NEXT_MONTH') {
    return 'prev-next'
  }
  
  // Check if it's today
  const isToday = isSameDay(today, cellDate)
  
  if (isToday) {
    return 'today'
  }
  
  return 'default'
}

// Helper function to determine if we need range highlighting
function needsRangeHighlight(
  cellData: CalendarCellData,
  currentYear: number,
  currentMonth: number,
  selectedRange?: DateRange
): 'start' | 'middle' | 'end' | null {
  if (!selectedRange?.start || !selectedRange?.end) return null
  
  let cellDate: Date
  if (cellData.type === 'PREV_MONTH') {
    cellDate = new Date(currentYear, currentMonth - 1, cellData.date)
  } else if (cellData.type === 'NEXT_MONTH') {
    cellDate = new Date(currentYear, currentMonth + 1, cellData.date)
  } else {
    cellDate = new Date(currentYear, currentMonth, cellData.date)
  }
  
  if (isSameDay(cellDate, selectedRange.start)) return 'start'
  if (isSameDay(cellDate, selectedRange.end)) return 'end'
  if (isDateInRange(cellDate, selectedRange.start, selectedRange.end)) return 'middle'
  
  return null
}

// 抽象的导航处理器
const useNavigation = (currentYear: number, currentMonth: number, setCurrentYear: (year: number) => void, setCurrentMonth: (month: number) => void) => {
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentYear(direction === 'prev' ? currentYear - 1 : currentYear + 1)
  }

  return { navigateMonth, navigateYear }
}

export function Calendar({ 
  selectedDate, 
  selectedRange,
  mode = 'single',
  onDateSelect, 
  onRangeSelect,
  onCancel, 
  onConfirm,
  className,
  ...props 
}: CalendarProps) {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(selectedDate?.getFullYear() || selectedRange?.start?.getFullYear() || today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(selectedDate?.getMonth() || selectedRange?.start?.getMonth() || today.getMonth())
  const [internalSelectedDate, setInternalSelectedDate] = useState(selectedDate || today)
  const [internalSelectedRange, setInternalSelectedRange] = useState<DateRange>(selectedRange || { start: null, end: null })
  const [openSelector, setOpenSelector] = useState<'year' | 'month' | null>(null)
  
  const yearListRef = useRef<HTMLDivElement>(null)
  
  // 使用抽象的导航处理器
  const { navigateMonth, navigateYear } = useNavigation(currentYear, currentMonth, setCurrentYear, setCurrentMonth)
  
  const calendarGrid = useMemo(() => 
    generateCalendarGrid(currentYear, currentMonth, internalSelectedDate, internalSelectedRange),
    [currentYear, currentMonth, internalSelectedDate, internalSelectedRange]
  )
  
  const years = useMemo(() => {
    const end = today.getFullYear() + 100
    const start = today.getFullYear() - 100
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [today])

  useEffect(() => {
    if (openSelector === 'year' && yearListRef.current) {
      const selectedYearElement = yearListRef.current.querySelector<HTMLDivElement>('[data-selected="true"]')
      if (selectedYearElement) {
        yearListRef.current.scrollTop = selectedYearElement.offsetTop - yearListRef.current.clientHeight / 2 + selectedYearElement.clientHeight / 2
      }
    }
  }, [openSelector])
  
  const handleDateClick = (cellData: CalendarCellData) => {
    // 禁用非本月日期的选择
    if (cellData.type === 'PREV_MONTH' || cellData.type === 'NEXT_MONTH') {
      return
    }
    
    const newDate = new Date(currentYear, currentMonth, cellData.date)
    
    if (mode === 'single') {
      setInternalSelectedDate(newDate)
      onDateSelect?.(newDate)
    } else if (mode === 'range') {
      const newRange = { ...internalSelectedRange }
      
      if (!newRange.start || (newRange.start && newRange.end)) {
        // Start new range
        newRange.start = newDate
        newRange.end = null
      } else if (newRange.start && !newRange.end) {
        // Complete range
        if (newDate >= newRange.start) {
          newRange.end = newDate
        } else {
          // If clicked date is before start, swap them
          newRange.end = newRange.start
          newRange.start = newDate
        }
      }
      
      setInternalSelectedRange(newRange)
      onRangeSelect?.(newRange)
    }
  }

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(monthIndex)
    setOpenSelector(null)
  }

  const handleYearSelect = (year: number) => {
    setCurrentYear(year)
    setOpenSelector(null)
  }

  const handleConfirm = () => {
    if (mode === 'single') {
      onConfirm?.(internalSelectedDate)
    } else {
      onConfirm?.(undefined, internalSelectedRange)
    }
  }
  
  return (
    <div className={cn(calendarVariants(), className)} data-open-selector={openSelector !== null} {...props}>
      {/* Header Row */}
      <div className="flex items-center justify-between h-16 px-3">
        {/* Month Selector */}
        <Selector
          label={MONTH_OPTIONS[currentMonth].slice(0, 3)}
          onPrev={() => navigateMonth('prev')}
          onNext={() => navigateMonth('next')}
          onToggleOpen={() => setOpenSelector(openSelector === 'month' ? null : 'month')}
          isDisabled={openSelector === 'year'}
          isInvisible={true}
        />
        
        {/* Year Selector */}
        <Selector
          label={String(currentYear)}
          onPrev={() => navigateYear('prev')}
          onNext={() => navigateYear('next')}
          onToggleOpen={() => setOpenSelector(openSelector === 'year' ? null : 'year')}
          isDisabled={openSelector === 'month'}
          isInvisible={true}
        />
      </div>
      
      {/* Calendar Grid or Selectors */}
      {openSelector === null ? (
        <>
          <div className="px-3 pb-1">
            {/* Week Header */}
            <div className="flex">
              {DAYS_OF_WEEK_LABELS.map((day, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center body-large text-on-surface"
                  style={{ width: COMPONENT_WIDTH, height: COMPONENT_HEIGHT }}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Date Grid */}
            {calendarGrid.map((weekData, weekIndex) => (
              <div key={weekIndex} className="flex">
                {weekData.map((cellData, dayIndex) => {
                  const cellType = getCellType(cellData, today, currentYear, currentMonth, mode, internalSelectedDate, internalSelectedRange)
                  const rangePosition = needsRangeHighlight(cellData, currentYear, currentMonth, internalSelectedRange)
                  
                  return (
                    <div
                      key={dayIndex}
                      className={cn(cellContainerVariants({ cellType: cellType === 'range-middle' ? 'range-middle' : 'default' }))}
                      style={{ width: COMPONENT_WIDTH, height: COMPONENT_HEIGHT }}
                    >
                      {/* Range highlight background for middle dates */}
                      {rangePosition && (
                        <div className={cn(rangeHighlightVariants({ position: rangePosition }))} />
                      )}
                      
                      {/* Date button */}
                      <button
                        className={cn(cellInnerVariants({ cellType }))}
                        style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
                        onClick={() => handleDateClick(cellData)}
                      >
                        {cellData.date}
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
      
          {/* Actions Row */}
          <div className="flex justify-end gap-2 p-3">
            <Button
              variant="text"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="text"
              onClick={handleConfirm}
            >
              OK
            </Button>
          </div>
        </>
      ) : (
        <div 
          className="overflow-y-auto w-full h-[336px]"
          ref={yearListRef}
        >
          {openSelector === 'month' && (
            <SelectorList
              items={MONTH_OPTIONS}
              selectedItem={MONTH_OPTIONS[currentMonth]}
              onItemSelect={(month) => handleMonthSelect(MONTH_OPTIONS.indexOf(month))}
              getDisplayValue={(month) => month}
              getKey={(month) => month}
            />
          )}
          {openSelector === 'year' && (
            <SelectorList
              items={years}
              selectedItem={currentYear}
              onItemSelect={handleYearSelect}
              getDisplayValue={(year) => String(year)}
              getKey={(year) => year}
              className="mx-2"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Calendar
