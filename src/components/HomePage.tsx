import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './mdui/button'

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          MD3E UI 组件库
        </h1>
        <p className="text-lg text-on-surface/70 max-w-2xl mx-auto">
          基于 Material Design 3 规范的 React 组件库，提供现代化、美观且易用的 UI 组件。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ComponentCard
          title="Button 按钮"
          description="各种类型的按钮组件，支持不同尺寸、状态和样式"
          path="/button"
          icon="🔘"
        />
        <ComponentCard
          title="Switch 开关"
          description="Material Design 3 风格的开关组件，支持自定义颜色和状态"
          path="/switch"
          icon="🔘"
        />
        <ComponentCard
          title="Button Group 按钮组"
          description="按钮组组件，支持溢出处理和动态宽度调整"
          path="/button-group"
          icon="🔘"
        />
        <ComponentCard
          title="UI Button"
          description="基础 UI 按钮组件，简洁实用的设计"
          path="/ui-button"
          icon="🔘"
        />
      </div>

      <div className="bg-surface-variant rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">开始使用</h2>
        <p className="text-on-surface/70 mb-6">
          选择左侧导航中的任意组件，查看详细的使用示例和 API 文档。
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/button">
            <Button>查看按钮示例</Button>
          </Link>
          <Link to="/switch">
            <Button variant="outlined">查看开关示例</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface ComponentCardProps {
  title: string
  description: string
  path: string
  icon: string
}

function ComponentCard({ title, description, path, icon }: ComponentCardProps) {
  return (
    <Link
      to={path}
      className="block p-6 bg-surface border border-outline rounded-lg hover:bg-surface-variant transition-colors duration-200 group"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-on-surface/70 text-sm">
        {description}
      </p>
    </Link>
  )
} 