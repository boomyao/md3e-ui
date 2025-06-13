import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    // Base container styles - 4.5x = 18px (using 4px as base unit)
    "relative inline-flex items-center justify-center",
    "size-[18px] shrink-0",
    "rounded-extra-small-decreased",
    "transition-all motion-fast-spatial",
    "focus-visible:outline-none focus-visible:ring-0",
    "disabled:pointer-events-none",
    
    // State layer - 10x = 40px
    "before:absolute before:inset-0 before:size-10 before:-translate-x-1/2 before:-translate-y-1/2",
    "before:left-1/2 before:top-1/2 before:rounded-full",
    "before:transition-all before:motion-fast-spatial before:opacity-0",
    
    // Default unselected state
    "bg-transparent border-[0.5px] border-on-surface-variant",
    "before:bg-on-surface",
    
    // Hover state
    "hover:border-on-surface hover:before:opacity-[0.08]",
    
    // Focus state
    "focus-visible:border-on-surface focus-visible:before:opacity-[0.1]",
    
    // Active/Pressed state
    "active:bg-on-surface active:before:opacity-[0.1]",
    
    // Selected state
    "data-[state=checked]:bg-primary data-[state=checked]:border-0",
    "data-[state=checked]:before:bg-primary",
    
    // Indeterminate state
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-0",
    "data-[state=indeterminate]:before:bg-primary",
    
    "has-[+input:user-invalid]:border-error has-[+input:user-invalid]:hover:border-error has-[+input:user-invalid]:focus-visible:border-error",
    "has-[+input:user-invalid]:before:bg-error",
    "has-[+input:user-invalid]:data-[state=checked]:bg-error has-[+input:user-invalid]:data-[state=checked]:before:bg-error",
    "has-[+input:user-invalid]:data-[state=indeterminate]:bg-error has-[+input:user-invalid]:data-[state=indeterminate]:before:bg-error",
    
    // Disabled state
    "disabled:bg-on-surface disabled:border-on-surface disabled:opacity-[0.38]",
  ]
)

const checkboxIconVariants = cva(
  [
    "size-[18px]",
    "transition-colors motion-fast-spatial",
    // Default icon color
    "text-on-primary",
    "group-has-[+input:user-invalid]:text-on-error",
    // Disabled icon color
    "group-disabled:text-surface",
  ]
)

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("group", checkboxVariants({ className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className={cn(checkboxIconVariants())} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }

