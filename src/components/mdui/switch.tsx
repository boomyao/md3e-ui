"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva([
  "peer inline-flex h-[32px] w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors transition-expressive-spatial-fast",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  // Enabled-Unchecked
  "border-outline bg-surface-container-highest",
  // Enabled-Checked
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
  // Disabled
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-12",
  // Disabled-Checked
  "data-[disabled]:data-[state=checked]:bg-on-surface data-[disabled]:data-[state=checked]:border-transparent",
  // Disabled-Unchecked
  "data-[disabled]:data-[state=unchecked]:border-on-surface",
]);

const thumbVariants = cva([
  "pointer-events-none relative block rounded-full ring-0 transition-all transition-expressive-spatial-fast",
  // Base (Unchecked)
  "h-4 w-4 translate-x-[4px] bg-outline",
  // Unchecked with Icon (`has` selector)
  "has-[[data-icon=unchecked]]:data-[state=unchecked]:h-6 has-[[data-icon=unchecked]]:data-[state=unchecked]:w-6 has-[[data-icon=unchecked]]:data-[state=unchecked]:translate-x-[2px]",
  // Checked
  "data-[state=checked]:h-6 data-[state=checked]:w-6 data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-on-primary",
  // Hovered / Focused / Pressed
  "group-hover/switch:data-[state=unchecked]:bg-on-surface-variant",
  "group-focus-visible/switch:data-[state=unchecked]:bg-on-surface-variant",
  "group-active/switch:data-[state=unchecked]:bg-on-surface-variant",
  "group-hover/switch:data-[state=checked]:bg-primary-container",
  "group-focus-visible/switch:data-[state=checked]:bg-primary-container",
  "group-active/switch:data-[state=checked]:bg-primary-container",
  // Pressed (Scale)
  "group-active/switch:scale-175", // Scale for 16px -> 28px
  "group-active/switch:data-[state=checked]:scale-[1.167]", // Override for 24px -> 28px
  "group-active/switch:has-[[data-icon=unchecked]]:data-[state=unchecked]:scale-[1.167]", // Override for 24px -> 28px
  // Disabled
  "data-[disabled]:data-[state=checked]:bg-surface data-[disabled]:data-[state=checked]:opacity-100",
  "data-[disabled]:data-[state=unchecked]:bg-on-surface data-[disabled]:data-[state=unchecked]:opacity-38",
  // State Layer
  "before:content-[''] before:absolute before:z-[-1] before:w-10 before:h-10 before:rounded-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:transition-expressive-effects-fast",
  "group-hover/switch:data-[state=unchecked]:before:bg-on-surface/8",
  "group-focus-visible/switch:data-[state=unchecked]:before:bg-on-surface/8",
  "group-active/switch:data-[state=unchecked]:before:bg-on-surface/8",
  "group-hover/switch:data-[state=checked]:before:bg-primary/10",
  "group-focus-visible/switch:data-[state=checked]:before:bg-primary/10",
  "before:group-active/switch:data-[state=checked]:bg-primary/10",
  // Counter-scale state layer
  "group-active/switch:before:scale-[0.572]", // 1 / 1.75
  "group-active/switch:data-[state=checked]:before:scale-[0.857]", // 1 / 1.167
  "group-active/switch:has-[[data-icon=unchecked]]:data-[state=unchecked]:before:scale-[0.857]", // 1 / 1.167
]);

const thumbIconVariants = cva([
  "absolute inset-0 flex items-center justify-center",
  // Color
  "group-data-[state=checked]/thumb:text-on-primary-container",
  "group-data-[state=unchecked]/thumb:text-surface-container-highest",
  // Disabled
  "group-data-[disabled]/thumb:opacity-[0.08]",
  "group-data-[disabled]/thumb:group-data-[state=checked]/thumb:text-on-surface",
]);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, checkedIcon, uncheckedIcon, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn("group/switch", switchVariants(), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn("group/thumb", thumbVariants())}>
        <div className={cn(thumbIconVariants())}>
          {checkedIcon && (
            <span
              className="hidden group-data-[state=checked]/thumb:block"
              data-icon="checked"
            >
              {checkedIcon}
            </span>
          )}
          {uncheckedIcon && (
            <span
              className="block group-data-[state=checked]/thumb:hidden"
              data-icon="unchecked"
            >
              {uncheckedIcon}
            </span>
          )}
        </div>
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = "Switch";

export { Switch };
