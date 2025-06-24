import React from "react"
import { MenuButton } from "../mdui/menu-button"

const MenuButtonDemo = () => {
  const handleMenuClick = (label: string) => {
    console.log(`点击了菜单按钮: ${label}`)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-on-surface">菜单按钮演示</h2>
        <p className="text-on-surface-variant">展示不同状态下的菜单按钮组件</p>
      </div>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">基础用法</h3>
        <div className="flex flex-wrap gap-4">
          <MenuButton onClick={() => handleMenuClick("选择选项")}>
            选择选项
          </MenuButton>
          <MenuButton onClick={() => handleMenuClick("更多操作")}>
            更多操作
          </MenuButton>
          <MenuButton onClick={() => handleMenuClick("排序方式")}>
            排序方式
          </MenuButton>
        </div>
      </section>

      {/* 不同状态 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">不同状态</h3>
        <div className="flex flex-wrap gap-4">
          <MenuButton onClick={() => handleMenuClick("正常状态")}>
            正常状态
          </MenuButton>
          <MenuButton disabled>
            禁用状态
          </MenuButton>
        </div>
      </section>

      {/* 常见用例 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">常见用例</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-on-surface">文件操作</h4>
            <div className="flex flex-wrap gap-2">
              <MenuButton onClick={() => handleMenuClick("新建文件")}>
                新建文件
              </MenuButton>
              <MenuButton onClick={() => handleMenuClick("导入文件")}>
                导入文件
              </MenuButton>
              <MenuButton onClick={() => handleMenuClick("导出选项")}>
                导出选项
              </MenuButton>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-on-surface">显示设置</h4>
            <div className="flex flex-wrap gap-2">
              <MenuButton onClick={() => handleMenuClick("视图切换")}>
                视图切换
              </MenuButton>
              <MenuButton onClick={() => handleMenuClick("筛选条件")}>
                筛选条件
              </MenuButton>
              <MenuButton onClick={() => handleMenuClick("显示列")}>
                显示列
              </MenuButton>
            </div>
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface">使用说明</h3>
        <div className="bg-surface-container-low p-4 rounded-lg space-y-2">
          <p className="text-sm text-on-surface-variant">
            • MenuButton 组件用于触发下拉菜单或选择操作
          </p>
          <p className="text-sm text-on-surface-variant">
            • 支持 disabled 属性来禁用按钮
          </p>
          <p className="text-sm text-on-surface-variant">
            • 自带悬停、聚焦和激活状态的视觉反馈
          </p>
          <p className="text-sm text-on-surface-variant">
            • 内置下拉箭头图标，符合 Material Design 3 规范
          </p>
        </div>
      </section>
    </div>
  )
}

export default MenuButtonDemo
