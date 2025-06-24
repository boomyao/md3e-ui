import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  // 基础样式
  "relative inline-flex items-center justify-center transition-all duration-200 ease-in-out focus-visible:outline-none",
  {
    variants: {
      // Shape 变体 (Type)
      shape: {
        square: "",
        round: "",
      },
      // Size 变体
      size: {
        xs: "h-8 min-w-[28px]", // XSmall: 32px height, min 28px width
        sm: "h-10 min-w-[32px]", // Small: 40px height, min 32px width  
        md: "h-14 min-w-[48px]", // Medium: 56px height, min 48px width
        lg: "h-24 min-w-[64px]", // Large: 96px height, min 64px width
        xl: "h-[136px] min-w-[104px]", // XLarge: 136px height, min 104px width
      },
      // Style 变体
      variant: {
        standard: "bg-transparent hover:bg-on-surface/8 focus-visible:bg-on-surface/10 active:bg-on-surface/8",
        outline: "bg-transparent border border-outline-variant hover:bg-on-surface/8 focus-visible:bg-on-surface/10 active:bg-on-surface/8",
        tonal: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/92 focus-visible:bg-secondary-container/90 active:bg-secondary-container/92",
        filled: "bg-primary text-on-primary hover:bg-primary/92 focus-visible:bg-primary/90 active:bg-primary/92",
      },
      // Width 变体
      widthType: {
        narrow: "",
        default: "",
        wide: "",
      },
      // Disabled 状态
      disabled: {
        true: "opacity-38 pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      // Shape + Size 圆角组合
      {
        shape: "square",
        size: "xs",
        class: "rounded-small", // 12px
      },
      {
        shape: "square", 
        size: "sm",
        class: "rounded-small", // 12px
      },
      {
        shape: "square",
        size: "md", 
        class: "rounded-medium", // 16px
      },
      {
        shape: "square",
        size: ["lg", "xl"],
        class: "rounded-[28px]", // 28px
      },
      {
        shape: "round",
        class: "rounded-full", // 100px equivalent
      },

      // Size + WidthType 宽度组合
      {
        size: "xs",
        widthType: "narrow",
        class: "w-7", // 28px
      },
      {
        size: "xs", 
        widthType: "default",
        class: "w-8", // 32px
      },
      {
        size: "xs",
        widthType: "wide", 
        class: "w-10", // 40px
      },
      {
        size: "sm",
        widthType: "narrow",
        class: "w-8", // 32px  
      },
      {
        size: "sm",
        widthType: "default", 
        class: "w-10", // 40px
      },
      {
        size: "sm",
        widthType: "wide",
        class: "w-[52px]", // 52px
      },
      {
        size: "md",
        widthType: "narrow",
        class: "w-12", // 48px
      },
      {
        size: "md", 
        widthType: "default",
        class: "w-14", // 56px
      },
      {
        size: "md",
        widthType: "wide",
        class: "w-[72px]", // 72px
      },
      {
        size: "lg",
        widthType: "narrow", 
        class: "w-16", // 64px
      },
      {
        size: "lg",
        widthType: "default",
        class: "w-24", // 96px
      },
      {
        size: "lg",
        widthType: "wide",
        class: "w-32", // 128px
      },
      {
        size: "xl",
        widthType: "narrow",
        class: "w-[104px]", // 104px
      },
      {
        size: "xl",
        widthType: "default", 
        class: "w-[136px]", // 136px
      },
      {
        size: "xl",
        widthType: "wide",
        class: "w-[184px]", // 184px
      },

      // Outline variant stroke weights
      {
        variant: "outline",
        size: ["xs", "sm", "md"],
        class: "border",
      },
      {
        variant: "outline", 
        size: ["lg", "xl"],
        class: "border-2",
      },

      // Disabled state overrides
      {
        disabled: true,
        variant: ["standard", "outline"],
        class: "text-on-surface bg-transparent",
      },
      {
        disabled: true,
        variant: ["tonal", "filled"],
        class: "text-on-surface bg-on-surface/10",
      },
    ],
    defaultVariants: {
      shape: "round",
      size: "sm", 
      variant: "standard",
      widthType: "default",
      disabled: false,
    },
  }
)

const iconSizeVariants = cva("[&>svg]:w-full [&>svg]:h-full", {
  variants: {
    size: {
      xs: "h-5 w-5", // 20px
      sm: "h-6 w-6", // 24px
      md: "h-6 w-6", // 24px  
      lg: "h-8 w-8", // 32px
      xl: "h-10 w-10", // 40px
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof iconButtonVariants>, 'disabled'> {
  icon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    shape, 
    size, 
    variant, 
    widthType, 
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          iconButtonVariants({ 
            shape, 
            size, 
            variant, 
            widthType, 
            disabled: props.disabled 
          }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* State layer for focus indicator */}
        <div className="absolute inset-0 rounded-[inherit] focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center">
            <div 
              className={cn(
                iconSizeVariants({ size }),
                "transition-colors duration-200"
              )} 
            >
              {children}
            </div>
        </div>
      </button>
    )
  }
)

IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
