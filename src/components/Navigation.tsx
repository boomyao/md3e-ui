import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  path: string
  category: string
}

const navigationItems: NavigationItem[] = [
  { name: 'Badge', path: '/badge', category: 'MDUI' },
  { name: 'Button', path: '/button', category: 'MDUI' },
  { name: 'Checkbox', path: '/checkbox', category: 'MDUI' },
  { name: 'Progress', path: '/progress', category: 'MDUI' },
  { name: 'Slider', path: '/slider', category: 'MDUI' },
  { name: 'Switch', path: '/switch', category: 'MDUI' },
  { name: 'TextField', path: '/text-field', category: 'MDUI' },
  { name: 'Tooltip', path: '/tooltip', category: 'MDUI' },
]

export function Navigation() {
  const location = useLocation()

  // 按类别分组
  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, NavigationItem[]>)

  return (
    <nav className="w-64 bg-surface border-r border-outline h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            MD3E UI
          </Link>
        </h1>
        
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-semibold text-on-surface/60 uppercase tracking-wide mb-3">
                {category}
              </h2>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200",
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-on-surface hover:bg-surface-variant hover:text-on-surface-variant"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-outline">
          <p className="text-xs text-on-surface/50">
            Material Design 3 组件库演示
          </p>
        </div>
      </div>
    </nav>
  )
} 