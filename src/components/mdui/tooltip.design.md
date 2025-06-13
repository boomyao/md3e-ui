# Tooltips Design Specs

## Variant

- Plain
- Rich

## Anatomy

- Plain
  - Container
  - Supporting text
- Rich
  - Container
  - Subhead
  - Supporting text
  - Action text button

### Plain tooltip Container Specs

- Background-Color: md.sys.color.inverse-surface
- Shape: md.sys.shape.corner.extra-small
- Padding-X: 2x

### Plain tooltip Supporting text Specs

- Typography: md.sys.typography.body-small
- Color: md.sys.color.inverse-on-surface

### Rich tooltip Container Specs

- Background-Color: md.sys.color.surface-container
- Elevation: md.sys.elevation.level2
- Shape: md.sys.shape.corner.medium
- Padding-X: 4x
- Padding-Top: 3x
- Padding-Bottom: 2x

### Rich tooltip Subhead Specs

- Typography: md.sys.typography.title-small
- Color: md.sys.color.on-surface-variant
- Margin-Bottom: 1x

### Rich tooltip Supporting text Specs

- Typography: md.sys.typography.body-small
- Color: md.sys.color.on-surface-variant

### Rich tooltip Supporting text button Specs

- Typography: md.sys.typography.body-medium
- Color: md.sys.color.on-surface-variant

### Rich tooltip Action text button Specs

- Button component with `text` variant and `extra-small` size
- Margin-Top: 3x
