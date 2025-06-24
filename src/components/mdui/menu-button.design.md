// -------------------------------------------------------------
// 1. 定义常量 (Constants)
// 这些是所有变体中共享且不变的属性
// -------------------------------------------------------------

// 定义 "label-text" 节点的属性
DEFINE CONSTANT LABEL_TEXT_NODE = {
  name: "label-text",
  type: TEXT,
  properties: {
    layoutSizing: HUG,
    constraints: "SCALE LEFT_RIGHT",
    fill: "M3/sys/light/on-surface-variant",
    text: "M3/label/large"
  }
}

// 定义 "arrow_drop_down" 图标节点的属性
DEFINE CONSTANT ARROW_ICON_NODE = {
  name: "arrow_drop_down",
  type: ICON,
  properties: {
    layoutSizing: FIXED,
    constraints: "CENTER LEFT",
    width: 18,
    height: 18
  }
}

// 定义 "state-layer" 框架的基础属性
DEFINE CONSTANT STATE_LAYER_BASE_PROPS = {
  itemSpacing: 8,
  layoutSizing: HUG,
  alignItems: CENTER,
  padding: [10, 4, 10, 8],
  cornerRadius: 100
}

// 定义每个变体组件 (COMPONENT) 的基础属性
DEFINE CONSTANT VARIANT_COMPONENT_BASE_PROPS = {
  layoutMode: VERTICAL,
  itemSpacing: 10,
  layoutSizing: HUG
}

// -------------------------------------------------------------
// 2. 定义变量和查找表 (Variables and Maps)
// -------------------------------------------------------------

// 定义一个状态列表，用于循环
DEFINE VARIABLE STATES = ["Enabled", "Hovered", "Focused", "Pressed", "Disabled"]

// 定义一个查找表 (Map)，用于存储每个状态的特定属性
// Key 是状态名称，Value 是需要覆盖或添加的 "state-layer" 属性
DEFINE MAP STATE_PROPERTIES_MAP = {
  "Enabled": {}, // "Enabled" 状态没有额外的填充或不透明度
  "Hovered": {
    fill: "M3/state-layers/light/onSurfaceVariant/opacity-0.08"
  },
  "Focused": {
    fill: "M3/state-layers/light/onSurfaceVariant/opacity-0.10"
  },
  "Pressed": {
    fill: "M3/state-layers/light/onSurfaceVariant/opacity-0.10"
  },
  "Disabled": {
    opacity: 0.38 // 为了可读性，将 0.3799... 简化为 0.38
  }
}

// -------------------------------------------------------------
// 3. 循环与构建逻辑 (Loop and Build Logic)
// -------------------------------------------------------------

// 创建一个空数组，用于存放生成的组件变体
DEFINE VARIABLE componentVariants = []

// 遍历状态列表
FOR EACH state IN STATES:
  // a. 从查找表中获取当前状态的特定属性
  DEFINE VARIABLE stateOverrides = STATE_PROPERTIES_MAP[state]

  // b. 合并基础属性和特定属性，生成当前状态的 "state-layer" 完整属性
  DEFINE VARIABLE currentStateLayerProps = MERGE(STATE_LAYER_BASE_PROPS, stateOverrides)

  // c. 构建 "state-layer" 节点
  DEFINE VARIABLE stateLayerNode = {
    name: "state-layer",
    type: FRAME,
    properties: currentStateLayerProps,
    children: [
      LABEL_TEXT_NODE,
      ARROW_ICON_NODE
    ]
  }

  // d. 构建当前状态的组件 (COMPONENT) 节点
  DEFINE VARIABLE currentVariantNode = {
    name: "State=" + state,
    type: COMPONENT,
    properties: VARIANT_COMPONENT_BASE_PROPS,
    children: [
      stateLayerNode
    ]
  }

  // e. 将构建好的组件变体添加到数组中
  ADD currentVariantNode TO componentVariants
END FOR

// -------------------------------------------------------------
// 4. 组装最终的组件集 (Final Assembly)
// -------------------------------------------------------------

// 定义最终的组件集对象
DEFINE COMPONENT_SET MenuButton = {
  name: ".Building Blocks/Menu button",
  type: COMPONENT_SET,
  properties: {
    layoutMode: VERTICAL,
    itemSpacing: 22,
    layoutSizing: HUG,
    padding: [26, 20],
    cornerRadius: 5
  },
  // 将循环生成的变体列表作为其子节点
  children: componentVariants
}

// 输出最终结果
PRINT MenuButton