# Switch Development Specs

Base on @radix-ui/react-switch. And use data-*, not,has, [svg] etc. to implement the state and interaction of the component.

## Extended Props

- checkedIcon: React.ReactNode
- uncheckedIcon: React.ReactNode

## Code Shape

``` tsx
const switchVariants = cva(
  baseClassNames,
  {
    variants: {
      disabled
    }
  }
  ...
)

const thumbVariants = cva(
  baseClassNames,
  {
    variants: {
      disabled
    }
  }
)

const thumbIconVariants = cva(
  baseClassNames,
  {
    variants: {
      disabled
    }
  }
)

// Component
```

## Implementation

- Use Thumb:before to implement the state layer.
- Use Scale to implement the Thumb size change. But the scale should not scale State Layer.
