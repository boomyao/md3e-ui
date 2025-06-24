import { useState } from 'react'
import { Calendar } from '@/components/mdui/calendar'

interface DateRange {
  start: Date | null
  end: Date | null
}

export function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null })
  const [mode, setMode] = useState<'single' | 'range'>('single')

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    console.log('Selected date:', date)
  }

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range)
    console.log('Selected range:', range)
  }

  const handleConfirm = (date?: Date, range?: DateRange) => {
    if (mode === 'single' && date) {
      console.log('Confirmed date:', date)
    } else if (mode === 'range' && range) {
      console.log('Confirmed range:', range)
    }
  }

  const handleCancel = () => {
    console.log('Calendar cancelled')
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected'
    return date.toLocaleDateString('zh-CN')
  }

  const formatRange = (range: DateRange) => {
    if (!range.start) return 'No range selected'
    if (!range.end) return `From ${formatDate(range.start)} (selecting...)`
    return `${formatDate(range.start)} - ${formatDate(range.end)}`
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">日历组件演示</h2>
        
        {/* Mode Selector */}
        <div className="flex gap-4 items-center">
          <span className="font-medium">选择模式:</span>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="single"
              checked={mode === 'single'}
              onChange={(e) => setMode(e.target.value as 'single' | 'range')}
            />
            单选
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="range"
              checked={mode === 'range'}
              onChange={(e) => setMode(e.target.value as 'single' | 'range')}
            />
            范围选择
          </label>
        </div>

        {/* Selected Value Display */}
        <div className="p-4 bg-gray-100 rounded-lg">
          {mode === 'single' ? (
            <div>
              <strong>已选择日期:</strong> {formatDate(selectedDate)}
            </div>
          ) : (
            <div>
              <strong>已选择范围:</strong> {formatRange(selectedRange)}
            </div>
          )}
        </div>
      </div>

      {/* Calendar */}
      <div className="w-[360px]">
        <Calendar
          mode={mode}
          selectedDate={mode === 'single' ? selectedDate : undefined}
          selectedRange={mode === 'range' ? selectedRange : undefined}
          onDateSelect={handleDateSelect}
          onRangeSelect={handleRangeSelect}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600 space-y-2">
        <h3 className="font-semibold">使用说明:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>单选模式:</strong> 点击任意日期进行选择</li>
          <li><strong>范围选择模式:</strong> 点击开始日期，再点击结束日期完成范围选择</li>
          <li>在范围选择模式下，如果第二次点击的日期在第一次之前，会自动调整顺序</li>
          <li>支持跨月份选择日期范围</li>
          <li>点击 OK 确认选择，点击 Cancel 取消操作</li>
        </ul>
      </div>
    </div>
  )
}

export default CalendarDemo
