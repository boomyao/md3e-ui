import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { forwardRef, type ReactNode, useRef, useEffect, useState } from "react"

// List Container Variants
const listVariants = cva(
  [
    "w-full",
    "bg-surface",
    "rounded-none",
    "shadow-none",
  ]
)

// List Item Variants
const listItemVariants = cva(
  [
    "relative",
    "flex",
    "min-h-[56px]",
    "w-full",
    "items-center",
    "px-4",
    "py-2",
    "transition-colors",
    "duration-200",
    "cursor-pointer",
    "outline-none",
    "bg-surface",
    "text-on-surface",
    "border-0",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-on-surface/8",
          "active:bg-on-surface/10",
          "focus-visible:bg-on-surface/8",
          "data-[selected=true]:bg-secondary-container",
          "data-[selected=true]:text-on-secondary-container",
          "data-[selected=true]:hover:bg-on-surface/8",
          "data-[selected=true]:active:bg-on-surface/8",
        ],
        disabled: [
          "pointer-events-none",
          "text-on-surface/38",
          "cursor-not-allowed",
        ],
      },
      multiLine: {
        false: "",
        true: "py-3", // 12px vertical spacing for multi-line content
      },
    },
    defaultVariants: {
      variant: "default",
      multiLine: false,
    },
  }
)

// List Item Content Variants
const listItemContentVariants = cva(
  [
    "flex",
    "flex-1",
    "flex-col",
    "justify-center",
    "gap-1",
    "min-w-0",
  ]
)

// List Item Headline Variants
const listItemHeadlineVariants = cva(
  [
    "body-large",
    "text-on-surface",
    "truncate",
    "text-left",
    "group-data-[selected=true]:text-on-secondary-container",
    "group-data-[variant=disabled]:text-on-surface/38",
  ]
)

// List Item Supporting Text Variants
const listItemSupportingTextVariants = cva(
  [
    "body-medium",
    "text-on-surface-variant",
    "line-clamp-2",
    "text-left",
    "group-data-[selected=true]:text-on-surface",
    "group-data-[variant=disabled]:text-on-surface/38",
  ]
)

// List Item Element Variants
const listItemElementVariants = cva(
  [
    "self-stretch",
    "flex",
    "items-center",
    "justify-center",
    "shrink-0",
  ],
  {
    variants: {
      position: {
        leading: "mr-4",
        trailing: "ml-4",
      },
      alignment: {
        center: "items-center",
        start: "items-start",
      },
    },
    defaultVariants: {
      alignment: "center",
    },
  }
)

// Types
interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

interface ListItemBaseProps {
  children?: ReactNode
  selected?: boolean
  disabled?: boolean
  leadingElement?: ReactNode
  trailingElement?: ReactNode
  headline: ReactNode
  supportingText?: ReactNode
}

interface ListItemButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof listItemVariants>,
    ListItemBaseProps {
  as?: "button"
}

interface ListItemAnchorProps 
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof listItemVariants>,
    ListItemBaseProps {
  as: "a"
}

interface ListItemDivProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listItemVariants>,
    ListItemBaseProps {
  as: "div"
}

type ListItemProps = ListItemButtonProps | ListItemAnchorProps | ListItemDivProps

interface ListItemElementProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listItemElementVariants> {
  children?: ReactNode
}

// Helper function to detect text lines
const useTextLineCount = (text: ReactNode, enabled: boolean = true) => {
  const [lineCount, setLineCount] = useState(1)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !text || !textRef.current) {
      setLineCount(1)
      return
    }

    const element = textRef.current
    const lineHeight = parseInt(window.getComputedStyle(element).lineHeight)
    const height = element.offsetHeight
    
    if (lineHeight && height) {
      const calculatedLines = Math.round(height / lineHeight)
      setLineCount(calculatedLines)
    }
  }, [text, enabled])

  return { lineCount, textRef }
}

// List Container Component
const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(listVariants(), className)}
        role="list"
        {...props}
      >
        {children}
      </div>
    )
  }
)
List.displayName = "List"

// List Item Component
const ListItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLDivElement,
  ListItemProps
>(({ 
  className, 
  variant, 
  selected = false,
  disabled = false,
  leadingElement,
  trailingElement,
  headline,
  supportingText,
  as: Component = "button",
  children,
  ...props 
}, ref) => {
  const itemVariant = disabled ? "disabled" : variant
  
  // Detect supporting text line count
  const { lineCount, textRef } = useTextLineCount(supportingText, !!supportingText)
  const isMultiLine = lineCount >= 2
  
  // Determine element alignment based on line count
  const elementAlignment = isMultiLine ? "start" : "center"

  const content = (
    <>
      {leadingElement && (
        <ListItemElement position="leading" alignment={elementAlignment}>
          {leadingElement}
        </ListItemElement>
      )}
      
      <div className={cn(listItemContentVariants())}>
        <div className={cn(listItemHeadlineVariants())}>
          {headline}
        </div>
        {supportingText && (
          <div 
            ref={textRef}
            className={cn(listItemSupportingTextVariants())}
          >
            {supportingText}
          </div>
        )}
        {children}
      </div>

      {trailingElement && (
        <ListItemElement position="trailing" alignment={isMultiLine ? "start" : "center"}>
          {trailingElement}
        </ListItemElement>
      )}
    </>
  )

  const baseClassName = cn(
    listItemVariants({ 
      variant: itemVariant, 
      multiLine: isMultiLine 
    }),
    "group",
    className
  )

  const dataProps = {
    "data-selected": selected,
    "data-variant": itemVariant,
    "data-multi-line": isMultiLine,
    "data-line-count": lineCount,
  }

  if (Component === "button") {
    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={baseClassName}
        disabled={disabled}
        role="listitem"
        {...dataProps}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }

  if (Component === "a") {
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={baseClassName}
        role="listitem"
        {...dataProps}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      ref={ref as React.ForwardedRef<HTMLDivElement>}
      className={baseClassName}
      role="listitem"
      {...dataProps}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {content}
    </div>
  )
})
ListItem.displayName = "ListItem"

// List Item Element Component
const ListItemElement = forwardRef<HTMLDivElement, ListItemElementProps>(
  ({ className, position, alignment, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(listItemElementVariants({ position, alignment }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ListItemElement.displayName = "ListItemElement"

export {
  List,
  ListItem,
  ListItemElement,
  listVariants,
  listItemVariants,
  listItemContentVariants,
  listItemHeadlineVariants,
  listItemSupportingTextVariants,
  listItemElementVariants,
}
