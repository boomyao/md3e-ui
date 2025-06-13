"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Plain tooltip content variants
const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-xs bg-inverse-surface px-2 py-1 body-small text-inverse-on-surface animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {},
    defaultVariants: {},
  }
)

// Rich tooltip content variants
const richTooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md bg-surface-container px-4 pt-3 pb-2 shadow-elevation-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {},
    defaultVariants: {},
  }
)

// Tooltip component combining Provider and Root
const Tooltip = ({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root> & { children: React.ReactNode }) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props}>
      {children}
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

const TooltipTrigger = TooltipPrimitive.Trigger

// Plain tooltip content
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants(), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Rich tooltip content
interface RichTooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof richTooltipContentVariants> {
  title: string
  confirmText: string
  onConfirm: () => void
  children: React.ReactNode
}

const RichTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  RichTooltipContentProps
>(({ className, sideOffset = 4, title, confirmText, onConfirm, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(richTooltipContentVariants(), className)}
      {...props}
    >
      <div className="title-small text-on-surface-variant mb-1">
        {title}
      </div>
      <div className="body-small text-on-surface-variant">
        {children}
      </div>
              <div className="mt-3">
          <Button
            variant="text"
            size="xs"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
RichTooltipContent.displayName = "RichTooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, RichTooltipContent }
