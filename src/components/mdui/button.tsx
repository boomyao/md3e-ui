import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base styles
    "relative inline-flex items-center justify-center whitespace-nowrap",
    "transition-all motion-fast-spatial",
    "focus-visible:outline-none focus-visible:ring-0",
    "disabled:pointer-events-none",
    "overflow-hidden",
    // State layer with :before pseudo-element
    "before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0",
    "before:transition-opacity before:motion-fast-spatial",
    "hover:before:opacity-[0.08] focus-visible:before:opacity-[0.1] active:before:opacity-[0.1]",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-primary text-on-primary shadow-elevation-0",
          "hover:shadow-elevation-1",
          "before:bg-on-primary",
          "disabled:bg-on-surface disabled:text-on-surface disabled:opacity-[0.12]",
          "disabled:text-opacity-[0.38]",
        ],
        tonal: [
          "bg-secondary-container text-on-secondary-container shadow-elevation-0",
          "hover:shadow-elevation-1",
          "before:bg-on-secondary-container", 
          "disabled:bg-on-surface disabled:text-on-surface disabled:opacity-[0.1]",
          "disabled:text-opacity-[0.38]",
        ],
        outline: [
          "bg-transparent text-on-surface-variant border border-outline-variant shadow-elevation-0",
          "before:bg-outline-variant",
          "disabled:bg-transparent disabled:text-on-surface disabled:border-on-surface disabled:opacity-[0.1]",
          "disabled:border-opacity-[0.1] disabled:text-opacity-[0.38]",
        ],
        elevated: [
          "bg-surface-container-low text-primary shadow-elevation-1",
          "hover:shadow-elevation-2",
          "before:bg-on-primary hover:before:bg-primary",
          "disabled:bg-on-surface disabled:text-on-surface disabled:opacity-[0.1]",
          "disabled:text-opacity-[0.38]",
        ],
        text: [
          "bg-transparent text-primary shadow-elevation-0",
          "before:bg-on-primary hover:before:bg-primary",
          "disabled:bg-transparent disabled:text-on-surface disabled:opacity-[0.1]",
          "disabled:text-opacity-[0.38]",
        ],
      },
      size: {
        xs: [
          "px-3 py-1.5 gap-2 title-small",
          "[&>svg]:size-5",
        ],
        sm: [
          "px-4 py-2 gap-2 title-medium", 
          "[&>svg]:size-5",
        ],
        md: [
          "px-6 py-4 gap-2 body-large",
          "[&>svg]:size-6",
        ],
        lg: [
          "px-12 py-8 gap-3 headline-small",
          "[&>svg]:size-8",
        ],
        xl: [
          "px-16 py-12 gap-4 headline-large",
          "[&>svg]:size-10",
        ],
      },
      shape: {
        round: "",
        square: "",
      },
    },
    compoundVariants: [
      // Round radius variants by size
      { size: "xs", shape: "round", class: "rounded-large" },
      { size: "sm", shape: "round", class: "rounded-large-increased" },
      { size: "md", shape: "round", class: "rounded-extra-large-increased" },
      { size: "lg", shape: "round", class: "rounded-extra-large-increased-2" },
      { size: "xl", shape: "round", class: "rounded-extra-large-increased-3" },
      
      // Square radius variants by size
      { size: "xs", shape: "square", class: "rounded-medium" },
      { size: "sm", shape: "square", class: "rounded-medium" },
      { size: "md", shape: "square", class: "rounded-large" },
      { size: "lg", shape: "square", class: "rounded-extra-large" },
      { size: "xl", shape: "square", class: "rounded-extra-large" },
      
      // Pressed radius variants by size
      { size: "xs", class: "active:rounded-small" },
      { size: "sm", class: "active:rounded-small" },
      { size: "md", class: "active:rounded-medium" },
      { size: "lg", class: "active:rounded-large" },
      { size: "xl", class: "active:rounded-large" },
    ],
    defaultVariants: {
      variant: "filled",
      size: "sm",
      shape: "round",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
