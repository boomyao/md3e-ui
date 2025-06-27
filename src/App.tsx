import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import { ButtonDemo } from './components/demos/ButtonDemo'
import SwitchDemo from './components/demos/SwitchDemo'
import { CheckboxDemo } from './components/demos/CheckboxDemo'
import { TextFieldDemo } from './components/demos/TextFieldDemo'
import BadgeDemo from './components/demos/BadgeDemo'
import TooltipDemo from './components/demos/TooltipDemo'
import SliderDemo from './components/demos/SliderDemo'
import ProgressDemo from './components/demos/ProgressDemo'
import { DialogDemo } from './components/demos/DialogDemo'
import ListsDemo from './components/demos/ListsDemo'
import MenuDemo from './components/demos/MenuDemo'
import { CalendarDemo } from './components/demos/CalendarDemo'
import MenuButtonDemo from './components/demos/MenuButtonDemo'
import { DatePickerDemo } from './components/demos/DatePickerDemo'
import { TimerPickerDemo } from './components/demos/TimerPickerDemo'
import { RadioButtonDemo } from './components/demos/RadioButtonDemo'
import { SheetDemo } from './components/demos/SheetDemo'

function App() {

  return (
    <div className="min-h-screen bg-background flex">
      {/* 侧边栏导航 */}
      <Navigation />
      
      {/* 主内容区域 */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/switch" element={<SwitchDemo />} />
          <Route path="/button" element={<ButtonDemo />} />
          <Route path="/calendar" element={<CalendarDemo />} />
          <Route path="/checkbox" element={<CheckboxDemo />} />
          <Route path="/text-field" element={<TextFieldDemo />} />
          <Route path="/badge" element={<BadgeDemo />} />
          <Route path="/tooltip" element={<TooltipDemo />} />
          <Route path="/slider" element={<SliderDemo />} />
          <Route path="/progress" element={<ProgressDemo />} />
          <Route path="/dialog" element={<DialogDemo />} />
          <Route path="/lists" element={<ListsDemo />} />
          <Route path="/menu" element={<MenuDemo />} />
          <Route path="/menu-button" element={<MenuButtonDemo />} />
          <Route path="/date-picker" element={<DatePickerDemo />} />
          <Route path="/timer-picker" element={<TimerPickerDemo />} />
          <Route path="/radio-button" element={<RadioButtonDemo />} />
          <Route path="/sheet" element={<SheetDemo />} />
          {/* 其他路由可以继续添加 */}
        </Routes>
      </main>
    </div>
  )
}

export default App
