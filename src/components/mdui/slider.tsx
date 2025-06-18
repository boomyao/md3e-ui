"use client"

import React, { useState, useRef, useCallback, useMemo } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Slider Container Variants
const sliderVariants = cva(
  "relative w-full cursor-pointer select-none focus:outline-none",
  {
    variants: {
      size: {
        xs: "h-4",
        sm: "h-6", 
        md: "h-10",
        lg: "h-14",
        xl: "h-24"
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer"
      }
    },
    defaultVariants: {
      size: "sm",
      disabled: false
    }
  }
)

// Track Variants
const trackVariants = cva(
  "relative flex items-center w-full",
  {
    variants: {
      size: {
        xs: "h-4",
        sm: "h-6",
        md: "h-10", 
        lg: "h-14",
        xl: "h-24"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
)

// Active Track Variants
const activeTrackVariants = cva(
  "bg-primary transition-colors",
  {
    variants: {
      size: {
        xs: "h-4 rounded-l-[8px] rounded-r-[2px]",
        sm: "h-6 rounded-l-[8px] rounded-r-[2px]",
        md: "h-10 rounded-l-[12px] rounded-r-[2px]",
        lg: "h-14 rounded-l-[16px] rounded-r-[2px]",
        xl: "h-24 rounded-l-[28px] rounded-r-[2px]"
      },
      disabled: {
        true: "bg-on-surface opacity-38",
        false: "bg-primary"
      }
    },
    defaultVariants: {
      size: "sm",
      disabled: false
    }
  }
)

// Inactive Track Variants
const inactiveTrackVariants = cva(
  "bg-secondary-container flex-1 transition-colors",
  {
    variants: {
      size: {
        xs: "h-4 rounded-r-[8px] rounded-l-[2px]",
        sm: "h-6 rounded-r-[8px] rounded-l-[2px]", 
        md: "h-10 rounded-r-[12px] rounded-l-[2px]",
        lg: "h-14 rounded-r-[16px] rounded-l-[2px]",
        xl: "h-24 rounded-r-[28px] rounded-l-[2px]"
      },
      disabled: {
        true: "bg-on-surface opacity-12",
        false: "bg-secondary-container"
      }
    },
    defaultVariants: {
      size: "sm",
      disabled: false
    }
  }
)

// Handle Variants
const handleVariants = cva(
  "bg-primary rounded-full transition-all duration-200 flex-shrink-0",
  {
    variants: {
      size: {
        xs: "w-1 h-11 mx-1.5",
        sm: "w-1 h-11 mx-1.5",
        md: "w-1 h-13 mx-1.5",
        lg: "w-1 h-17 mx-1.5", 
        xl: "w-1 h-27 mx-1.5"
      },
      disabled: {
        true: "bg-on-surface opacity-38 shadow-none",
        false: "bg-primary shadow-sm"
      },
      focused: {
        true: "w-0.5",
        false: ""
      },
      pressed: {
        true: "w-0.5",
        false: ""
      }
    },
    defaultVariants: {
      size: "sm",
      disabled: false,
      focused: false,
      pressed: false
    }
  }
)

// Value Indicator Variants
const valueIndicatorVariants = cva(
  "absolute bottom-full mb-1 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-full label-large whitespace-nowrap transform -translate-x-[calc(50%-4px)] transition-opacity transition-expressive-effects-fast",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none"
      }
    },
    defaultVariants: {
      visible: false
    }
  }
)

// Stop Indicator Variants
const stopIndicatorVariants = cva(
  "absolute w-1 h-1 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-colors",
  {
    variants: {
      active: {
        true: "bg-on-primary",
        false: "bg-on-secondary-container"
      },
      disabled: {
        true: "bg-on-surface",
        false: ""
      }
    },
    defaultVariants: {
      active: false,
      disabled: false
    }
  }
)

interface SliderProps {
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  ticks?: boolean
  onChange?: (value: number) => void
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    value = 0, 
    min = 0, 
    max = 100, 
    step = 1,
    disabled = false,
    size = "xs",
    ticks = false,
    onChange,
    className,
    ...props 
  }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    // Calculate percentage
    const percentage = useMemo(() => {
      return ((value - min) / (max - min)) * 100
    }, [value, min, max])

    // Calculate stop indicators positions
    const stopIndicators = useMemo(() => {
      if (!step || step <= 0) return []
      
      const indicators = []
      for (let val = min; val <= max; val += step) {
        const pos = ((val - min) / (max - min)) * 100
        indicators.push({
          value: val,
          position: pos,
          active: val <= value,
          current: val === value
        })
      }
      return indicators
    }, [min, max, step, value])

    // Get value from mouse position
    const getValueFromPosition = useCallback((clientX: number) => {
      if (!sliderRef.current) return value

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      let newValue = min + percentage * (max - min)

      // Snap to step if step is defined
      if (step > 0) {
        newValue = Math.round(newValue / step) * step
      }

      return Math.max(min, Math.min(max, newValue))
    }, [min, max, step, value])

    // Handle mouse events
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (disabled) return

      e.preventDefault()
      setIsDragging(true) 
      setIsPressed(true)
      
      const newValue = getValueFromPosition(e.clientX)
      onChange?.(newValue)
    }, [disabled, getValueFromPosition, onChange])

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging || disabled) return

      const newValue = getValueFromPosition(e.clientX)
      onChange?.(newValue)
    }, [isDragging, disabled, getValueFromPosition, onChange])

    const handleMouseUp = useCallback(() => {
      setIsDragging(false)
      setIsPressed(false)
    }, [])

    // Handle keyboard events
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = value
      const stepSize = step > 0 ? step : 1

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault()
          newValue = Math.max(min, value - stepSize)
          break
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          newValue = Math.min(max, value + stepSize)
          break
        case 'Home':
          e.preventDefault()
          newValue = min
          break
        case 'End':
          e.preventDefault()
          newValue = max
          break
        default:
          return
      }

      onChange?.(newValue)
    }, [disabled, value, step, min, max, onChange])

    // Effect for mouse events
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }
      }
    }, [isDragging, handleMouseMove, handleMouseUp])

    return (
      <div
        ref={ref}
        className={cn(sliderVariants({ size, disabled }), className)}
        {...props}
      >
        {/* Stop Indicators */}
        {ticks && stopIndicators.length > 0 && (
          <div className="absolute inset-0 left-2 right-2 z-10">
            {stopIndicators.map((indicator, index) => (
              !indicator.current && (
                <div
                  key={index}
                  className={cn(
                    stopIndicatorVariants({ 
                      active: indicator.active, 
                      disabled 
                    })
                  )}
                  style={{ left: `${indicator.position}%` }}
                />
              )
            ))}
          </div>
        )}
        
        {/* Track Container */}
        <div
          ref={sliderRef}
          className={cn(trackVariants({ size }))}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
        >
          {/* Active Track */}
          <div
            className={cn(activeTrackVariants({ size, disabled }))}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Handle */}
          <div className="relative z-20">
            <div
              className={cn(
                handleVariants({ 
                  size, 
                  disabled, 
                  focused: isFocused, 
                  pressed: isPressed 
                })
              )}
            />
            
            {/* Value Indicator */}
            <div
              className={cn(
                valueIndicatorVariants({ visible: isPressed && !disabled })
              )}
            >
              {value}
            </div>
          </div>
          
          {/* Inactive Track */}
          <div
            className={cn(inactiveTrackVariants({ size, disabled }))}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = "Slider"

export { Slider, sliderVariants }
