import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

// 遮罩层样式
const dialogOverlayVariants = cva(
  [
    "fixed inset-0 z-50 bg-shadow opacity-32",
    "data-[state=open]:animate-dialog-scrim-in data-[state=closed]:animate-dialog-scrim-out",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
    VariantProps<typeof dialogOverlayVariants>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayVariants(), className)}
    {...props}
  />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const dialogContentVariants = cva(
  [
    "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-surface-container-highest rounded-extra-large min-w-[280px] max-w-[560px] p-6",
    "data-[state=open]:animate-dialog-container-in",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogContentVariants>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants(), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

DialogContent.displayName = DialogPrimitive.Content.displayName

// 标题样式
const dialogHeaderVariants = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left",
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogHeaderVariants>) => (
  <div className={cn(dialogHeaderVariants(), className)} {...props} />
)

DialogHeader.displayName = "DialogHeader"

// 底部操作区域样式
const dialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogFooterVariants>) => (
  <div className={cn(dialogFooterVariants(), className)} {...props} />
)

DialogFooter.displayName = "DialogFooter"

// 标题组件样式
const dialogTitleVariants = cva(
  "headline-small text-on-surface leading-none tracking-tight",
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> &
    VariantProps<typeof dialogTitleVariants>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleVariants(), className)}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

// 描述组件样式
const dialogDescriptionVariants = cva(
  "body-medium text-on-surface/[0.87]",
  {
    variants: {},
    defaultVariants: {},
  }
)

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    VariantProps<typeof dialogDescriptionVariants>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionVariants(), className)}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
