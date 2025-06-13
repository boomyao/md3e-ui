# Tooltip Development Specs

## Props

### Plain tooltip

No props.

### Rich tooltip

- RichTooltipContent
  - `title`: `string` -> Subhead
  - `confirmText`: `string` -> Action text button
  - `onConfirm`: `() => void` -> Action text button click handler

## Sample Code

```tsx
<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    Supporting text
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <RichTooltipContent title="Subhead" confirmText="Confirm" onConfirm={() => {}}>
    Supporting text
  </RichTooltipContent>
</Tooltip>
```

## Implementation

- Use @radix-ui Tooltip component to implement the component.
- `Tooltip` component is combined with TooltipPrimitive.Provider and TooltipPrimitive.Root component.
- `TooltipContent` and `RichTooltipContent` component is combined with TooltipPrimitive.Portal and TooltipPrimitive.Content component.
- Only implement the styles for Content components.
- Reuse the TextButton component with `./button` component.