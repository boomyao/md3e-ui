# Switch Specs

## States

- Enabled
- Disabled
- Hovered
- Focused
- Pressed

## Value Types

- Selected
- Unselected

## Anatomy

- Track
- Handle(formerly Thumb)
  - State Layer
  - Icon (optional)

## Track Specs

- Enabled
  - Width: 13x
  - Height: 8x
  - Filled-Color
    - Selected: md.sys.color.primary
    - UnSelected: md.sys.color.surface-container-highest
  - Outline-Color
    - UnSelected: md.sys.color.outline
  - Outline-Width: 0.5x
  - Outline-Offset: -0.5x
  - Vertical-Alignment: center

- Disabled
  - Filled-Color
    - Selected: md.sys.color.on-surface
    - UnSelected: md.sys.color.surface-container-highest
  - Outline-Color
    - UnSelected: md.sys.color.on-surface
  - Opacity: 0.12

## Handle Specs

- Enabled
  - Width
    - Selected: 6x
    - UnSelected: 4x
      - With Icon: 6x
  - Height
    - Selected: 6x
    - UnSelected: 4x
      - With Icon: 6x
  - Shape: md.sys.shape.corner.full
  - Filled-Color
    - Selected: md.sys.color.on-primary
    - UnSelected: md.sys.color.outline
  - Left
    - UnSelected: 1x
      - With Icon: 0.5x
    - Selected: 5.5x
  
- Disabled
  - Opacity
    - Selected: 1
    - UnSelected: 0.38
  - Filled-Color
    - Selected: md.sys.color.surface
    - UnSelected: md.sys.color.on-surface

- Hovered
  - Filled-Color
    - Selected: md.sys.color.primary-container
    - UnSelected: md.sys.color.on-surface-variant

- Focused
  - Filled-Color
    - Selected: md.sys.color.primary-container
    - UnSelected: md.sys.color.on-surface-variant

- Pressed
  - Width: 7x
  - Height: 7x
  - Filled-Color
    - Selected: md.sys.color.primary-container
    - UnSelected: md.sys.color.on-surface-variant

## State Layer Specs

- Enabled
  - Size: 10x
  - Shape: md.sys.shape.corner.full

- Hovered & Focused & Pressed
  - Filled-Color
    - Selected: md.sys.color.primary
    - UnSelected: md.sys.color.on-surface
  - Opacity:
    - Selected: 0.1
    - UnSelected: 0.08

- Focused
  - Filled-Color
    - Selected: md.sys.color.primary-container
    - UnSelected: md.sys.color.on-surface-variant

## Icon Specs

- Enabled
  - Size: 4x
  - Color:
    - Selected: md.sys.color.on-primary-container
    - UnSelected: md.sys.color.surface-container-highest
  - Position: center

- Disabled
  - Color:
    - Selected: md.sys.color.on-surface
    - UnSelected: md.sys.color.surface-container-highest
  - Opacity: 0.08

## Motion

- Track: motion-fast-spatial
- Handle: motion-fast-spatial
- State Layer: motion-fast-effects
