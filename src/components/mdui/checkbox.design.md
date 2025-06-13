# Checkbox Specs

## States

Enabled, Disabled, Pressed, Hovered, Focused

## Anatomy

- Container
- Icon
- State Layer

## Container Specs

- Enabled
  - Size: 4.5x
  - Shape: md.sys.shape.corner.extra-small-decreased
  - Background-Color
    - selected: md.sys.color.primary
      - error: md.sys.color.error
    - unselected: transparent
  - Outline-Color
    - unselected: md.sys.color.on-surface-variant
    - selected: transparent
    - error: md.sys.color.error
  - Outline-Width
    - selected: 0
    - unselected: 0.5x

- Disabled
  - Background-Color: md.sys.color.on-surface
  - Outline-Color: md.sys.color.on-surface
  - Opacity: 0.38

- Hovered
  - Outline-Color: md.sys.color.on-surface

- Focused
  - Outline-Color: md.sys.color.on-surface

- Pressed
  - Background-Color: md.sys.color.on-surface

## Icon Specs

- Enabled
  - Size: 4.5x
  - Color: md.sys.color.on-primary
    - error: md.sys.color.on-error

- Disabled
  - Color: md.sys.color.surface

## State Layer Specs

- Enabled
  - Size: 10x
  - Shape: md.sys.shape.corner.full

- Hovered
  - Background-Color
    - selected: md.sys.color.primary
    - unselected: md.sys.color.on-surface
    - error: md.sys.color.error
  - Opacity: 0.08

- Focused
  - Background-Color = Hovered
  - Opacity: 0.1

- Pressed = Focused

## Motion

motion-fast-spatial
