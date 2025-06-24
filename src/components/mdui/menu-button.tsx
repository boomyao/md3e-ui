import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ArrowDropDownIcon } from '@/components/mdui/icons'

const menuButtonVariants = cva(
  // 基础样式 - 对应 state-layer 的基础属性
  [
    'group inline-flex items-center gap-2',
    'px-2 py-[10px] pl-2 pr-1', // padding: [10, 4, 10, 8] 转换为 Tailwind
    'rounded-full', // cornerRadius: 100
    'label-large', // M3/label/large 文字样式
    'text-on-surface-variant', // M3/sys/light/on-surface-variant
    'transition-colors duration-200',
    'cursor-pointer',
    'select-none',
    'outline-none',
    // 默认启用状态
    'hover:bg-on-surface-variant/8', // M3/state-layers/light/onSurfaceVariant/opacity-0.08
    'focus-visible:bg-on-surface-variant/10', // M3/state-layers/light/onSurfaceVariant/opacity-0.10
    'active:bg-on-surface-variant/10', // Pressed 状态
  ],
  {
    variants: {
      disabled: {
        true: [
          'opacity-38', // 0.38 透明度
          'cursor-not-allowed',
          'hover:bg-transparent',
          'focus-visible:bg-transparent',
          'active:bg-transparent'
        ]
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
)

export interface MenuButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof menuButtonVariants> {
  children: React.ReactNode
  disabled?: boolean
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(menuButtonVariants({ disabled, className }))}
        ref={ref}
        disabled={disabled}
        data-disabled={disabled}
        {...props}
      >
        <span className="flex-1 text-left">
          {children}
        </span>
        <ArrowDropDownIcon 
          className="w-[18px] h-[18px] flex-shrink-0 group-data-[disabled=true]:invisible" 
        />
      </button>
    )
  }
)

MenuButton.displayName = 'MenuButton'

export { MenuButton, menuButtonVariants }
