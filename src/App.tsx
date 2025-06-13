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
          <Route path="/checkbox" element={<CheckboxDemo />} />
          <Route path="/text-field" element={<TextFieldDemo />} />
          <Route path="/badge" element={<BadgeDemo />} />
          <Route path="/tooltip" element={<TooltipDemo />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
