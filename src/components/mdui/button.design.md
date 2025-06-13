# Button Specs

## Variants

Filled, Tonal, Outline, Elevated, Text

## Sizes

Xsmall, Small, Medium, Large, Xlarge

## Shapes

Round, Square

## States

Enabled, Disabled, Pressed, Hovered, Focused

## Anatomy

- Container
- Label
- Icon(optional)

## Container Specs

- Enabled
  - Background-Color
    - Filled: md.sys.color.primary
    - Tonal: md.sys.color.secondary-container
    - Elevated: md.sys.color.surface-container-low
    - (Outlined, Text): transparent
  - Elevation
    - (Filled, Tonal, Outlined, Text): md.sys.elevation.level0
    - Elevated: md.sys.elevation.level1
  - Outline-Color:
    - Outlined: md.sys.color.outline-variant
- Disabled
  - Background-Color
    - (Filled, Tonal, Elevated, Text): md.sys.color.on-surface
    - Outlined: transparent
  - Opacity
    - Filled: 0.12
    - (Tonal, Outlined, Elevated, Text): 0.1
  - Outline-Opacity
    - Outlined: 0.1

- Hovered
  - State-Layer-Color
    - Filled: md.sys.color.on-primary
    - Tonal: md.sys.color.on-secondary-container
    - Outlined: md.sys.color.outline-variant
    - (Text, Elevated): md.sys.color.primary
  - State-Layer-Opacity: 0.08
  - Elevation
    - (Filled, Tonal): md.sys.elevation.level1
    - (Outlined, Text): md.sys.elevation.level0
    - Elevated: md.sys.elevation.level2
- Focused
  - State-Layer-Color
    - Filled: md.sys.color.on-primary
    - Tonal: md.sys.color.on-secondary-container
    - Outlined: md.sys.color.outline-variant
    - (Elevated, Text): md.sys.color.primary
  - State-Layer-Opacity: 0.1
- Pressed
  - State-Layer-Color
    - Filled: md.sys.color.on-primary
    - Tonal: md.sys.color.on-secondary-container
    - Outlined: md.sys.color.outline-variant
    - (Elevated, Text): md.sys.color.primary
  - State-Layer-Opacity: 0.1

## Label Specs

- Enabled
  - Color
    - Filled: md.sys.color.on-primary
    - Tonal: md.sys.color.on-secondary-container
    - Outlined: md.sys.color.on-surface-variant
    - (Elevated, Text): md.sys.color.primary
- Disabled
  - Color: md.sys.color.on-surface
  - Opacity: 0.38

## Size Specs

- Xsmall
  - Typography: title-small
  - Padding: 1.5x 3x
  - Icon-Size: 5x
  - Icon-Gap: 2x
  - Round-Radius: md.sys.shape.corner.large
  - Square-Radius: md.sys.shape.corner.medium
  - Pressed-Radius: md.sys.shape.corner.small

- Small
  - Typography: title-medium
  - Padding: 2x 4x
  - Icon-Size: 5x
  - Icon-Gap: 2x
  - Round-Radius: md.sys.shape.corner.large-increased
  - Square-Radius: md.sys.shape.corner.medium
  - Pressed-Radius: md.sys.shape.corner.small

- Medium
  - Typography: body-large
  - Padding: 4x 6x
  - Icon-Size: 6x
  - Icon-Gap: 2x
  - Round-Radius: md.sys.shape.corner.extra-large-increased
  - Square-Radius: md.sys.shape.corner.large
  - Pressed-Radius: md.sys.shape.corner.medium

- Large
  - Typography: headline-small
  - Padding: 8x 12x
  - Icon-Size: 8x
  - Icon-Gap: 3x
  - Round-Radius: md.sys.shape.corner.extra-large-increased-2
  - Square-Radius: md.sys.shape.corner.extra-large
  - Pressed-Radius: md.sys.shape.corner.large

- Xlarge
  - Typography: headline-large
  - Padding: 12x 16x
  - Icon-Size: 10x
  - Icon-Gap: 4x
  - Round-Radius: md.sys.shape.corner.extra-large-increased-3
  - Square-Radius: md.sys.shape.corner.extra-large
  - Pressed-Radius: md.sys.shape.corner.large

## Motion

- Container: motion-fast-spatial
- State-Layer: motion-fast-spatial
