import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textFieldVariants = cva(
  [
    // Base container styles
    "group/textfield",
    "relative",
    "inline-flex",
    "items-center",
    "gap-4",
    "transition-all",
    "transition-expressive-spatial-fast",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-surface-container-highest",
          "rounded-t-extra-small",
          "px-4",
          "py-1",
          // State layer for hover
          "hover:before:absolute",
          "hover:before:inset-0", 
          "hover:before:bg-on-surface/8",
          "hover:before:rounded-t-extra-small",
          // Active indicator (after pseudo-element)
          "after:absolute",
          "after:bottom-0",
          "after:left-0",
          "after:right-0",
          "after:h-px",
          "after:bg-on-surface-variant",
          "after:transition-all",
          "after:motion-default-effects",
          // Focused state
          "has-[:focus]:after:h-0.5",
          "has-[:focus]:after:bg-primary",
          // Hover state
          "hover:after:bg-on-surface",
          // Error state
          "has-[:user-invalid]:after:bg-error",
          "has-[:focus]:has-[:user-invalid]:after:bg-error",
          "hover:has-[:user-invalid]:after:bg-on-error-container",
        ],
        outlined: [
          // Outlined container styles
          "outline",
          "outline-1",
          "outline-outline",
          "rounded-extra-small",
          "px-4",
          "py-1",
          // Hover state
          "hover:outline-on-surface",
          // Focused state
          "has-[:focus]:outline-primary",
          "has-[:focus]:outline-2",
          // Error state
          "has-[:user-invalid]:outline-error",
          "has-[:focus]:has-[:user-invalid]:outline-error",
          "hover:has-[:user-invalid]:outline-on-error-container",
        ],
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

const textFieldContentVariants = cva(
  [
    "group/content",
    "relative",
    "py-1",
    "min-h-12",
    "leading-1",
  ],
  {
    variants: {
      variant: {
        filled: [
          "pt-5",
          "group-has-[textarea:focus]/textfield:pt-5",
        ],
        outlined: [],
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

const textFieldLabelVariants = cva(
  [
    "absolute",
    "left-0",
    "text-on-surface-variant",
    "body-large",
    "transition-all",
    "motion-default-effects",
    "pointer-events-none",
    "select-none",
    "origin-top-left",
  ],
  {
    variants: {
      variant: {
        filled: [
          "top-3",
          // Populated state
          "group-has-[textarea:not(:placeholder-shown)]/content:top-1",
          "group-has-[textarea:not(:placeholder-shown)]/content:body-small",
          "group-has-[textarea:not(:placeholder-shown)]/content:px-1",
          // Focused state
          "group-has-[textarea:focus]/content:top-1",
          "group-has-[textarea:focus]/content:body-small",
          "group-has-[textarea:focus]/content:text-primary",
          "group-has-[textarea:focus]/content:px-1",
        ],
        outlined: [
          "top-3",
          // Populated state
          "group-has-[textarea:not(:placeholder-shown)]/content:top-[-12px]",
          "group-has-[textarea:not(:placeholder-shown)]/content:body-small",
          "group-has-[textarea:not(:placeholder-shown)]/content:bg-surface",
          "group-has-[textarea:not(:placeholder-shown)]/content:px-1",
          "group-has-[textarea:not(:placeholder-shown)]/content:-ml-1",
          // Focused state
          "group-has-[textarea:focus]/content:top-[-12px]",
          "group-has-[textarea:focus]/content:body-small",
          "group-has-[textarea:focus]/content:text-primary",
          "group-has-[textarea:focus]/content:bg-surface",
          "group-has-[textarea:focus]/content:px-1",
          "group-has-[textarea:focus]/content:-ml-1",
        ],
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

const textFieldInputVariants = cva(
  [
    "w-full",
    "bg-transparent",
    "border-none",
    "outline-none",
    "resize-none",
    "text-on-surface",
    "body-large",
    "placeholder:text-transparent",
    "caret-primary",
    // Focused state
    "focus:caret-primary",
    // Error state
    "user-invalid:caret-error",
    "focus:user-invalid:caret-error",
  ]
)

const textFieldIconVariants = cva(
  [
    "flex-shrink-0",
    "w-6",
    "h-6",
    "transition-colors",
    "motion-default-effects",
  ],
  {
    variants: {
      type: {
        leading: [
          "text-on-surface-variant",
        ],
        trailing: [
          "text-on-surface",
          // Error state
          "group-has-[textarea:user-invalid]/textfield:text-error",
          // Hover state
          "group-hover/textfield:text-on-surface-variant",
          "group-hover/textfield:group-has-[textarea:user-invalid]/textfield:text-on-error-container",
          // Focused state
          "group-has-[textarea:focus]/textfield:text-on-surface-variant",
          "group-has-[textarea:focus]/textfield:group-has-[textarea:user-invalid]/textfield:text-error",
        ],
      },
    },
  }
)

const textFieldSupportingTextVariants = cva(
  [
    "mt-1",
    "px-4",
    "body-small",
    "text-on-surface-variant",
    "transition-colors",
    "motion-default-effects",
    // Error state
    "group-has-[textarea:user-invalid]/textfield:text-error",
  ]
)

// Disabled state styles
const disabledStyles = {
  container: [
    "disabled:opacity-38",
    "has-[:disabled]:opacity-38",
  ],
  containerFilled: [
    "has-[:disabled]:bg-on-surface/4",
    "has-[:disabled]:after:bg-on-surface",
  ],
  containerOutlined: [
    "has-[:disabled]:outline-on-surface/12",
  ],
  label: [
    "group-has-[textarea:disabled]/content:text-on-surface",
  ],
  input: [
    "disabled:text-on-surface",
  ],
  icon: [
    "group-has-[textarea:disabled]/textfield:text-on-surface",
  ],
  supportingText: [
    "group-has-[textarea:disabled]/textfield:text-on-surface",
  ],
}

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textFieldVariants> {
  label?: string
  supportingText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ className, variant = "filled", label, supportingText, leadingIcon, trailingIcon, ...props }, ref) => {
    const containerId = React.useId()
    const hasLeadingIcon = Boolean(leadingIcon)
    const hasTrailingIcon = Boolean(trailingIcon)

    return (
      <div className="w-full">
        <div
          className={cn(
            textFieldVariants({ variant }),
            // Disabled styles
            disabledStyles.container,
            variant === "filled" && disabledStyles.containerFilled,
            variant === "outlined" && disabledStyles.containerOutlined,
            // Leading icon padding adjustment
            hasLeadingIcon && variant === "filled" && "pl-3",
            hasLeadingIcon && variant === "outlined" && "pl-3",
            // Trailing icon padding adjustment
            hasTrailingIcon && variant === "filled" && "pr-3",
            hasTrailingIcon && variant === "outlined" && "pr-3",
            className
          )}
        >
          {leadingIcon && (
            <div
              className={cn(
                textFieldIconVariants({ type: "leading" }),
                disabledStyles.icon
              )}
            >
              {leadingIcon}
            </div>
          )}
          
          <div className={cn(textFieldContentVariants({ variant }))}>
            {label && (
              <label
                htmlFor={containerId}
                className={cn(
                  textFieldLabelVariants({ variant }),
                  disabledStyles.label,
                  // Error state
                  "group-has-[textarea:user-invalid]/content:text-error",
                  "group-has-[textarea:focus]/content:group-has-[textarea:user-invalid]/content:text-error",
                  // Hover state
                  "group-hover/textfield:group-has-[textarea:user-invalid]/textfield:text-on-error-container",
                )}
              >
                {label}
              </label>
            )}
            
            <textarea
              id={containerId}
              ref={ref}
              placeholder=" "
              className={cn(
                textFieldInputVariants(),
                disabledStyles.input
              )}
              rows={1}
              {...props}
            />
          </div>
          
          {trailingIcon && (
            <div
              className={cn(
                textFieldIconVariants({ type: "trailing" }),
                disabledStyles.icon
              )}
            >
              {trailingIcon}
            </div>
          )}
        </div>
        
        {supportingText && (
          <div
            className={cn(
              textFieldSupportingTextVariants(),
              disabledStyles.supportingText
            )}
          >
            {supportingText}
          </div>
        )}
      </div>
    )
  }
)

TextField.displayName = "TextField"

export { TextField, textFieldVariants, type TextFieldProps }
