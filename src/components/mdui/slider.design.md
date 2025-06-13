# Slider Design Specs

## Anatomy

- Track
- Handle
- Value Indicator(optional)
- Stop Indicator(optional)

## Sizes

XSmall, Small, Medium, Large, XLarge

## States

Enabled, Disabled, Focused, Hovered, Pressed

## Track Specs

Active track is the part of the track that is filled with the color.
Inactive track is the part of the track that is not filled with the color.

- Enabled
  - Fill Color
    - Active: md.sys.color.primary
    - Inactive: md.sys.color.secondary-container
  - Elevation: md.sys.elevation.level0
  - Width: full
  - Height
    - XSmall: 16dp
    - Small: 24dp
    - Medium: 40dp
    - Large: 56dp
    - XLarge: 96dp

  // The corner size of the leading of the active track and the trailing of the inactive track.
  - Outer Shape
    - XSmall: 8dp
    - Small: 8dp
    - Medium: 12dp
    - Large: 16dp
    - XLarge: 28dp

  // The corner size of others of the tracks.
  - Inner Shape: md.sys.corner.extra-small

- Disabled
  - Fill Color: md.sys.color.on-surface
  - Opacity
    - Active: 0.38
    - Inactive: 0.12

## Handle Specs

A vertical bar shape, center aligned with the track.

- Enabled
  - Fill Color: md.sys.color.primary
  - Elevation: md.sys.elevation.level1
  - Shape: md.sys.corner.full
  - Content Width: 4dp
  - Height
    - XSmall: 44dp
    - Small: 44dp
    - Medium: 52dp
    - Large: 68dp
    - XLarge: 108dp
  - Leading Space: 6dp
  - Trailing Space: 6dp

- Disabled
  - Fill Color: md.sys.color.on-surface
  - Elevation: md.sys.elevation.level0
  - Opacity: 0.38

- Focused
  - Content Width: 2dp

- Pressed = Focused

## Value Indicator Specs

Only show when pressed, on top of the handle.

- Pressed
  - Fill Color: md.sys.color.inverse-surface
  - Typography: md.sys.typography.label-large
  - Color: md.sys.color.inverse-on-surface
  - Padding: 12dp 16dp
  - Shape: md.sys.corner.full
  - Bottom Space: 4dp

## Stop Indicator Specs

The count is the total value divided by the step.
Horizontally arranged, leading and trailing space is 4dp. Vertically centered.

- Enabled
  - Size: 4dp
  - Shape: md.sys.corner.full
  - Fill Color
    - Active: md.sys.color.on-primary
    - Inactive: md.sys.color.on-secondary-container

- Disabled
  - Size: 4dp
  - Shape: md.sys.corner.full
  - Fill Color: md.sys.color.on-surface

## Interaction

When there is a Step, the handle can only move to the Stop Indicators.
