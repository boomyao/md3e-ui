# Development Guide

## Project Introduction

The goal of this project is to create a set of components that are consistent with the Material Design 3 (MD3) design system. And the components be used like shadcn/ui, each component should be a standalone component.

## Work Advice

- Only edit the target file, don't edit or create other files.
- Just read the information that have been provided, don't read the others by yourself, this is very important!
- Utils have been provided and installed, don't need to read them again.

## Component Advice

- Almost all the components are base on the @radix-ui, but you should deep consider whether to use the @radix-ui or not.
- If user provide the props, you should strictly follow the props, and don't add other props.
- Use styles whenever possible instead of using JavaScript code.
- Classnames are declared by tailwind-variants, and separated from the component.
- If the component has states, try to use the tailwindcss variants, such as hovered - hover, focused - focus-visible, pressed - active, error - user-invalid etc. And use the data-*, not,has, [svg] etc. to implement the state and interaction of the component.

## Utils

- tailwindcss: installed and configured
- tailwind-variants: installed
- cn
  - path: src/lib/utils.ts

## Tailwind

- theme color variants
such as: bg-primary, bg-on-surface-variant ...

- typography classnames
such as: body-large, title-small, title-medium ...

- shape variants
such as: rounded-extra-small, rounded-small, rounded-medium, rounded-large, rounded-extra-large ...

- shadow variants
such as: shadow-elevation-0, shadow-elevation-1, shadow-elevation-2 ...

- transition variants
such as: transition-expressive-spatial-fast, transition-expressive-effects-fast ...

## Icon

path: src/components/mdui/icons

```
// such as arrow_drop_down

import { ArrowDropDownIcon } from '@/components/mdui/icons'
```

## Internal Components

If exist completed components, you can use them directly.

```
// such as

import { Button } from './button'
```



## ComponentCode Style Advice

if no variant, generate classnames on the component.

``` tsx
// cva code, Recommend to more code.
const xxxVariants = tv(
  ...
)

// component code, Recommend to less code.

export {
  xxx,
}
```

## Tips

If the design exists the variant's name: `style`, you should use the `variant` instead of `style`, such as `variant: "Outlined"`.
