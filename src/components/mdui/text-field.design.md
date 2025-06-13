# Text Field Specs

## Variants

Filled, Outlined

## States

Enabled, Disabled, Hovered,Focused

## Anatomy

- Container
  - State-Layer
- Content
  - Label text (empty, populated)
  - Input text
- Caret
- Supporting text (optional)
- Leading icon (optional)
- Trailing icon (optional)
- Active Indicator(Filled Only)

## Container Specs

- Enabled
  - Background-Color
    - Filled: md.sys.color.surface-container-highest
  - Shape:
    - Filled: md.sys.shape.corner.extra-small.top
    - Outlined: md.sys.shape.corner.extra-small
  - Padding-Y: 1x
  - Padding-Left: 4x
    - with leading icon: 3x
  - Padding-Right: 4x
    - with trailing icon: 3x
  - Alignment: center
  - Gap: 4x

  // Outlined Only
  - Outline-Width: 1px
  - Outline-Color: md.sys.color.outline
    - error: md.sys.color.error

- Disabled
  // Filled Only
  - Background-Color: md.sys.color.on-surface/4

  // Outlined Only
  - Outline-Color: md.sys.color.on-surface/12

- Hovered
  // Outlined Only
  - Outline-Color: md.sys.color.on-surface
    - error: md.sys.color.on-error-container

- Focused
  // Outlined Only
  - Outline-Width: 2px
  - Outline-Color: md.sys.color.primary
    - error: md.sys.color.error

## Content Specs

- Enabled
  - Padding: 1x 0
  - Min-Height: 12x
  - Padding-Top
    - Filled
      - populated: 5x

- Focused
  - Padding-Top
    - Filled
      - populated: 5x

## Label text Specs

- Enabled
  - Color: md.sys.color.on-surface-variant
    - error: md.sys.color.error
  - Typography: md.sys.typography.body-large
    - populated: md.sys.typography.body-small
  - Background-Color
    - Outlined
      - populated: md.sys.color.surface
  - Padding: 0 1x
  - Position-Left
    - Filled: 0
    - Outlined
      - populated: -1x
  - Position-Top
    - Filled
      - empty: 3x
      - populated: 1x
    - Outlined
      - empty: 3x
      - populated: -3x

- Disabled
  - Color: md.sys.color.on-surface
  - Opacity: 0.38

- Hovered
  - Color: md.sys.color.on-surface-variant
    - error: md.sys.color.on-error-container

- Focused
  - Color: md.sys.color.primary
    - error: md.sys.color.error
  - Background-Color
    - Outlined: md.sys.color.surface
  - Position-Left
    - Filled: 0
    - Outlined: -1x
  - Position-Top
    - Filled: 1x
    - Outlined: -3x

## State Layer Specs

- Hovered
  - Background-Color: md.sys.color.on-surface
  - Opacity: 0.08

## Input text Specs

- Enabled
  - Color: md.sys.color.on-surface
  - Typography: md.sys.typography.body-large

- Disabled
  - Opacity: 0.38

## Active Indicator Specs (Filled Only)

Above the bottom of the container.

- Enabled
  - Height: 1px
  - Background-Color: md.sys.color.on-surface-variant
    - error: md.sys.color.error

- Disabled
  - Background-Color: md.sys.color.on-surface
  - Opacity: 0.38

- Hovered
  - Background-Color: md.sys.color.on-surface
    - error: md.sys.color.on-error-container

- Focused
  - Height: 2px
  - Background-Color: md.sys.color.primary
    - error: md.sys.color.error

## Caret Specs

- Enabled
  - Color: md.sys.color.primary

- Focused
  - Color: md.sys.color.primary
    - error: md.sys.color.error

## Supporting text Specs

Below the bottom of the container.

- Enabled
  - Typography: md.sys.typography.body-small
  - Color: md.sys.color.on-surface-variant
    - error: md.sys.color.error
  - Padding: 1x 4x

- Disabled
  - Color: md.sys.color.on-surface
  - Opacity: 0.38

- Hovered
  - Color = Enabled

- Focused
  - Color = Enabled

## Leading icon Specs

- Enabled
  - Size: 6x
  - Color: md.sys.color.on-surface-variant

- Disabled
  - Color: md.sys.color.on-surface
  - Opacity: 0.38

## Trailing icon Specs

- Enabled
  - Size: 6x
  - Color: md.sys.color.on-surface
    - error: md.sys.color.error

- Disabled
  - Color: md.sys.color.on-surface
  - Opacity: 0.38

- Hovered
  - Color: md.sys.color.on-surface-variant
    - error: md.sys.color.on-error-container

- Focused
  - Color: md.sys.color.on-surface-variant
    - error: md.sys.color.error
