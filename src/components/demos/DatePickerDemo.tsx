import React from 'react'
import { DatePicker } from '@/components/mdui/date-picker'

export function DatePickerDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">DatePicker 组件</h1>
        <p className="text-lg text-on-surface/70">
          Material Design 3 日期选择器，提供直观的日期选择体验，支持日历弹出和输入框交互。
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">基本用法</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">默认日期选择器</h3>
              <div className="max-w-xs">
                <DatePicker />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* With Custom Initial Value */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">预设日期</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">当前日期</h3>
              <div className="max-w-xs">
                <DatePicker />
              </div>
              <p className="text-sm text-on-surface/60 mt-2">
                默认显示今天的日期
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Integration */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">表单集成</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">个人信息表单</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2">生日</label>
                  <DatePicker />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">入职日期</label>
                  <DatePicker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Date Range Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">日期范围选择</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">选择开始和结束日期</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2">开始日期</label>
                  <DatePicker />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">结束日期</label>
                  <DatePicker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Different Contexts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">不同场景应用</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">预约和日程</h3>
              <div className="space-y-4">
                <div className="max-w-xs">
                  <label className="block text-sm font-medium mb-2">预约日期</label>
                  <DatePicker />
                </div>
                <div className="max-w-xs">
                  <label className="block text-sm font-medium mb-2">会议日期</label>
                  <DatePicker />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">项目管理</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <div>
                  <label className="block text-sm font-medium mb-2">项目开始</label>
                  <DatePicker />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">里程碑</label>
                  <DatePicker />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">截止日期</label>
                  <DatePicker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">交互特性</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">功能说明</h3>
              <div className="max-w-xs">
                <DatePicker />
              </div>
              <div className="mt-4 space-y-2 text-sm text-on-surface/70">
                <p>• 点击输入框打开日历弹窗</p>
                <p>• 点击日历图标也可以打开弹窗</p>
                <p>• 在日历中选择日期</p>
                <p>• 选择后自动关闭弹窗并更新输入框</p>
                <p>• 支持键盘导航和无障碍访问</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">使用建议</h2>
        <div className="bg-surface-variant rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">适用场景</h3>
                <ul className="space-y-2 text-sm text-on-surface/70">
                  <li>• 表单中的日期输入</li>
                  <li>• 预约和预订系统</li>
                  <li>• 日程安排和事件管理</li>
                  <li>• 报告和数据筛选</li>
                  <li>• 生日和纪念日选择</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">设计原则</h3>
                <ul className="space-y-2 text-sm text-on-surface/70">
                  <li>• 提供清晰的日期格式显示</li>
                  <li>• 支持直观的日历视图</li>
                  <li>• 遵循 Material Design 3 规范</li>
                  <li>• 确保良好的可访问性</li>
                  <li>• 适配移动端和桌面端</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
