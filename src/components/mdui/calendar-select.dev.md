# Calendar Year and Month Dropdown Development Guidelines

## implementation

- 选择 @lists.tsx 来实现,选中项左侧显示勾选图标 CheckIcon.
- 通过点击 MenuButton 来开关 Dropdown.
- Dropdown 的宽度刚好覆盖 Calendar Grid 的宽度，且 高度为 336px.
- Dropdown显示时，Calendar Grid 和 Actions Row 隐藏.
- 年份和月份按钮状态互斥，只能打开一个，其中一个打开是，另一个 切换成 disabled 状态。
- 当 Dropdown 打开时，左右iconbutton 隐藏。