import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dividerVariants = cva(
  [
    // Base styles
    "bg-outline-variant",
    "shrink-0",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "w-full h-px",
        ],
        vertical: [
          "h-full w-px",
        ],
      },
      variant: {
        full: "",
        inset: "",
        "middle-inset": "",
      },
    },
    compoundVariants: [
      // Horizontal inset variants
      { orientation: "horizontal", variant: "inset", class: "ml-4" },
      { orientation: "horizontal", variant: "middle-inset", class: "mx-4" },
      
      // Vertical inset variants  
      { orientation: "vertical", variant: "inset", class: "mt-4" },
      { orientation: "vertical", variant: "middle-inset", class: "my-4" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "full",
    },
  },
)

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
        className={cn(dividerVariants({ orientation, variant, className }))}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }