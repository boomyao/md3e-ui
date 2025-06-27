Component: RadioButton

Properties:
  - selected: Boolean (True / False)   // 是否被选中
  - state: Enum (                      // 交互状态
      "Enabled",                       // 默认可用
      "Hovered",                       // 鼠标悬停
      "Focused",                       // 键盘聚焦
      "Pressed",                       // 按下
      "Disabled"                       // 禁用
    )

Structure (DOM-like):

  // 1. 最外层容器: 负责定义交互区域和整体尺寸
  COMPONENT_WRAPPER [48x48px] {
    display: flex;
    align-items: center;      // 垂直居中
    justify-content: center;  // 水平居中
  }

    // 2. 状态层容器: 用于显示交互反馈（如涟漪、覆盖层）
    ↳ CONTAINER [40x40px] {
        border-radius: 100px; // 完全的圆形
      }

        // 3. 状态层本身: 带有内边距，是视觉反馈的载体
        ↳ STATE_LAYER [40x40px] {
            padding: 8px;
          }

            // 4. 核心图标: 视觉主体
            ↳ ICON [24x24px]: reuse RadioButtonCheckedIcon and RadioButtonUncheckedIcon

Conditional Styling Logic:

// --- 规则 1: 根据 'selected' 状态选择图标 ---
IF (selected IS True) THEN
  ICON.source = "radio_button_checked.svg"
ELSE
  ICON.source = "radio_button_unchecked.svg"
END

// --- 规则 2: 根据 'state' 状态应用不同样式 ---
SWITCH (state):

  CASE "Enabled":
    // 无特殊样式
    STATE_LAYER.background = transparent;
    ICON.opacity = 1.0;

  CASE "Hovered":
    // 添加一层半透明背景，颜色根据是否选中而不同
    STATE_LAYER.background = (selected ? PrimaryColor(8%) : OnSurfaceColor(8%));
    ICON.opacity = 1.0;

  CASE "Focused":
    // 添加一层比 Hover 更明显的半透明背景
    STATE_LAYER.background = (selected ? PrimaryColor(10%) : OnSurfaceColor(10%));
    ICON.opacity = 1.0;

  CASE "Pressed":
    // 添加一层最明显的半透明背景
    STATE_LAYER.background = (selected ? OnSurfaceColor(10%) : PrimaryColor(10%));
    ICON.opacity = 1.0;

  CASE "Disabled":
    // 图标本身变灰，无交互反馈
    STATE_LAYER.background = transparent;
    ICON.opacity = 0.38; // 关键：通过降低不透明度来表示禁用