# TextField Development Specs

## Props

- label?: string
- supportingText?: string
- leadingIcon?: React.ReactNode
- trailingIcon?: React.ReactNode
- variant?: 'filled' | 'outlined'
  - default: 'filled'

## Implementation

- Directly use `textarea` element to implement the component.
- Don't custom event handlers for `textarea` element, just pass the props to the `textarea` element.
- The Focused state of TextField is :focus, not :focus-visible.
- Use `has-[:focus]:*` to handle the focused state.
- Use `group-has-[textarea:not(:placeholder-shown)]/content:*` to handle the populated state. Should set `placeholder` to `" "` to make it work.
- Use `after` pseudo-element to implement the active indicator.
- Use `outline` to implement the outline of Outlined variant.
- Set `rows={1}` to the `textarea` element to make it work, And set `line-height` to `1` to `Content` Element.
