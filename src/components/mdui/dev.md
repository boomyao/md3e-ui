# Development Specs

## Project Introduction

The goal of this project is to create a set of components that are consistent with the Material Design 3 (MD3) design system. And the components be used like shadcn/ui, each component should be a standalone component.

## Work Advice

- Only edit the target file, don't edit or create other files.
- Just read the specs that have been provided, don't read the others by yourself.
- Utils have been provided and installed, don't need to read them again.

## Component Advice

- Almost all the components are base on the @radix-ui.
- Use styles whenever possible instead of using JavaScript code.
- Classnames are declared by class-variance-authority, and separated from the component.
- Almost all the components have same states: enabled, disabled, hovered, focused, pressed, error.
- First try to use the tailwindcss variants, such as hovered - hover, focused - focus-visible, pressed - active, error - user-invalid etc. And use the data-*, not,has, [svg] etc. to implement the state and interaction of the component.

## Utils

- tailwindcss: installed and configured
- class-variance-authority: installed
- cn
  - path: src/lib/utils.ts

## Tailwind

- theme variables
  - path: src/index.css
- custom tailwind utilities
  path: src/styles/utilities.css

## ComponentCode Style Advice

``` tsx
// cva code, Recommend to more code.
const xxxVariants = cva(
  baseClassNames,
  ...
)

// component code, Recommend to less code.

export {
  xxx,
}
```
