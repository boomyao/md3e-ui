import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from "@/components/mdui/icons"

const radioButtonVariants = cva(
  [
    "group",
    "relative inline-flex items-center justify-center",
    "size-6", // 24px icon
    "rounded-full",
    "shrink-0",
    "focus-visible:outline-none",
    "disabled:pointer-events-none",

    // State Layer - 40x40px
    "before:absolute before:size-10 before:rounded-full",
    "before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
    "before:opacity-0",
    "before:transition-all before:transition-expressive-spatial-fast",

    // --- Unselected ---
    "data-[state=unchecked]:before:bg-on-surface",
    // Hover
    "data-[state=unchecked]:hover:before:opacity-[0.08]",
    // Focus
    "data-[state=unchecked]:focus-visible:before:opacity-[0.1]",
    // Pressed
    "data-[state=unchecked]:active:before:bg-primary",
    "data-[state=unchecked]:active:before:opacity-[0.1]",

    // --- Selected ---
    "data-[state=checked]:before:bg-primary",
    // Hover
    "data-[state=checked]:hover:before:opacity-[0.08]",
    // Focus
    "data-[state=checked]:focus-visible:before:opacity-[0.1]",
    // Pressed
    "data-[state=checked]:active:before:bg-on-surface",
    "data-[state=checked]:active:before:opacity-[0.1]",
  ]
);

const uncheckedIconVariants = cva(
  "size-full text-on-surface-variant group-data-[state=checked]:hidden group-disabled:text-on-surface group-disabled:opacity-[0.38]"
);

const checkedIconVariants = cva(
  "size-full text-primary group-disabled:text-on-surface group-disabled:opacity-[0.38]"
);

const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioButtonVariants(), className)}
    {...props}
  >
    <RadioButtonUncheckedIcon className={cn(uncheckedIconVariants())} />
    <RadioGroupPrimitive.Indicator asChild>
      <RadioButtonCheckedIcon className={cn(checkedIconVariants())} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioButton.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioButton, radioButtonVariants }
