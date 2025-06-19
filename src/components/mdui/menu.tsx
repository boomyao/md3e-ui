"use client"

import * as React from "react"
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Menu Container - Following MD3 design specs
const menuContentVariants = cva(
  [
    // Base styles
    "z-50 min-w-[8rem] overflow-hidden",
    // MD3 Colors
    "bg-surface-container text-on-surface shadow-elevation-2",
    // MD3 Shape: extra-small corner (4px)
    "rounded",
    // MD3 Spacing: 8dp vertical spacing
    "py-2",
    // Animation
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ]
)

// Menu Item - Following MD3 design specs
const menuItemVariants = cva(
  [
    // Base styles
    "relative flex cursor-default select-none items-center",
    // MD3 Spacing: 12dp leading/trailing, min-height 48dp
    "px-3 py-3 text-sm outline-none transition-colors min-h-[48px]",
    // MD3 Typography: body-large
    "text-sm text-on-surface",
    // MD3 States
    "focus-visible:bg-on-surface/8 focus-visible:text-on-surface",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-38",
    "data-[highlighted]:bg-secondary-container data-[highlighted]:text-on-secondary-container",
    "hover:bg-on-surface/8 hover:text-on-surface",
    "active:bg-on-surface/[0.1]",
  ],
  {
    variants: {
      inset: {
        true: "pl-8",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
)

// Menu Label - Following MD3 design specs
const menuLabelVariants = cva(
  [
    // MD3 Spacing
    "px-3 py-1.5 text-sm font-semibold",
    // MD3 Colors
    "text-on-surface-variant",
  ],
  {
    variants: {
      inset: {
        true: "pl-8",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
)

// Menu Separator - Following MD3 design specs
const menuSeparatorVariants = cva([
  // MD3 Divider: 8dp vertical spacing
  "-mx-1 my-2 h-px bg-outline-variant",
])

// Menu Shortcut - Following MD3 design specs
const menuShortcutVariants = cva([
  "ml-auto text-xs tracking-widest opacity-60",
  "text-on-surface-variant",
])

const Menu = MenuPrimitive.Root

const MenuTrigger = MenuPrimitive.Trigger

const MenuGroup = MenuPrimitive.Group

const MenuPortal = MenuPrimitive.Portal

const MenuSub = MenuPrimitive.Sub

const MenuRadioGroup = MenuPrimitive.RadioGroup

const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      menuItemVariants({ inset }),
      "focus:bg-secondary-container focus:text-on-secondary-container data-[state=open]:bg-secondary-container data-[state=open]:text-on-secondary-container",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuPrimitive.SubTrigger>
))
MenuSubTrigger.displayName = MenuPrimitive.SubTrigger.displayName

const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.SubContent
    ref={ref}
    className={cn(menuContentVariants(), className)}
    {...props}
  />
))
MenuSubContent.displayName = MenuPrimitive.SubContent.displayName

const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(menuContentVariants(), className)}
      {...props}
    />
  </MenuPrimitive.Portal>
))
MenuContent.displayName = MenuPrimitive.Content.displayName

const MenuItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & 
    VariantProps<typeof menuItemVariants>
>(({ className, inset, ...props }, ref) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(menuItemVariants({ inset }), className)}
    {...props}
  />
))
MenuItem.displayName = MenuPrimitive.Item.displayName

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(menuItemVariants(), "pr-2", className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
))
MenuCheckboxItem.displayName = MenuPrimitive.CheckboxItem.displayName

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(menuItemVariants(), "pr-2", className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
))
MenuRadioItem.displayName = MenuPrimitive.RadioItem.displayName

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label> &
    VariantProps<typeof menuLabelVariants>
>(({ className, inset, ...props }, ref) => (
  <MenuPrimitive.Label
    ref={ref}
    className={cn(menuLabelVariants({ inset }), className)}
    {...props}
  />
))
MenuLabel.displayName = MenuPrimitive.Label.displayName

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn(menuSeparatorVariants(), className)}
    {...props}
  />
))
MenuSeparator.displayName = MenuPrimitive.Separator.displayName

const MenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(menuShortcutVariants(), className)}
      {...props}
    />
  )
}
MenuShortcut.displayName = "MenuShortcut"

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuGroup,
  MenuPortal,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuRadioGroup,
}
