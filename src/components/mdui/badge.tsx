import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva([
  // Base styles - Container specs
  "inline-flex items-center justify-center",
  "min-h-1.5 min-w-1.5 not-[:empty]:min-h-4 not-[:empty]:min-w-4",
  "not-[:empty]:px-1",
  "rounded-full",
  // Background and text colors from MD3 system specs
  "bg-error text-on-error",
  // Typography specs - label-small
  "label-small",
])

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants(), className)} {...props} />
  )
}

export { Badge, badgeVariants }
