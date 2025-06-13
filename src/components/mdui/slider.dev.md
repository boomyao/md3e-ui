# Slider Development Specs

## Props

- value: number: default is 0
- min: number: default is 0
- max: number: default is 100
- step: number: default is 1
- disabled: boolean: default is false
- onChange: (value: number) => void
- size: "xs" | "sm" | "md" | "lg" | "xl": default is "xs"
- ticks: boolean: default is false

## Implementation

- Custom the slider component completely, not depend on headlessui.
- Use flex horizontal layout to align the active track, handle and inactive track, and use gap to implement the leading and trailing space of the handle.
- We need double same stop indicators absolutely positioned on both active track and inactive track, and the width of the stop indicators container equal with the width of the slider. and tracks overflow hidden.
