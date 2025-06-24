// ----------------------------------------------------------------
// 1. 定义常量 (Constants)
//    提取所有变体中不发生变化或极少变化的共享属性。
// ----------------------------------------------------------------

DEFINE CONSTANT COMPONENT_WIDTH = 48
DEFINE CONSTANT COMPONENT_HEIGHT = 48
DEFINE CONSTANT CONTAINER_SIZE = 40
DEFINE CONSTANT CONTAINER_RADIUS = 100
DEFINE CONSTANT OPACITY_DISABLED = 0.38  // 近似值 0.37999...
DEFINE CONSTANT TEXT_STYLE_REFERENCE = "M3/body/large"

// 定义共享的属性集，方便复用
DEFINE CONSTANT BASE_COMPONENT_PROPS = {
  layoutSizing: "FIXED",
  sizingMode: "FIXED",
  alignItems: "CENTER",
  width: COMPONENT_WIDTH,
  height: COMPONENT_HEIGHT
}

DEFINE CONSTANT BASE_CONTAINER_PROPS = {
  itemSpacing: 10,
  layoutSizing: "FIXED",
  sizingMode: "FIXED",
  alignItems: "CENTER",
  width: CONTAINER_SIZE,
  height: CONTAINER_SIZE
}

DEFINE CONSTANT BASE_STATELAYER_PROPS = {
  itemSpacing: 10,
  layoutSizing: "FIXED",
  sizingMode: "FIXED",
  alignItems: "CENTER",
  width: CONTAINER_SIZE,
  height: CONTAINER_SIZE
}

DEFINE CONSTANT BASE_DATE_TEXT_PROPS = {
  layoutSizing: "HUG",
  constraints: "SCALE SCALE",
  text: TEXT_STYLE_REFERENCE
}


// ----------------------------------------------------------------
// 2. 定义查找表 (Lookup Tables / Maps)
//    用于存储根据变体类型(Type)或状态(State)变化的属性。
// ----------------------------------------------------------------

// 状态(State) -> state-layer 叠加层填充色
// 注意：颜色依赖于组件类型，这里按类型分组
DEFINE MAP StateLayerFills = {
  "Default": {
    "Hovered": "M3/state-layers/light/onSurface/opacity-0.08",
    "Focused": "M3/state-layers/light/onSurface/opacity-0.10",
    "Pressed": "M3/state-layers/light/onSurface/opacity-0.10"
  },
  "Today": {
    "Hovered": "M3/state-layers/light/primary/opacity-0.08",
    "Focused": "M3/state-layers/light/primary/opacity-0.10",
    "Pressed": "M3/state-layers/light/primary/opacity-0.10"
  },
  "Selected": {
    "Hovered": "M3/state-layers/light/onPrimary/opacity-0.08",
    "Focused": "M3/state-layers/light/onPrimary/opacity-0.10",
    "Pressed": "M3/state-layers/light/onPrimary/opacity-0.10"
  },
  "Selected (Middle)": {
    "Hovered": "M3/state-layers/light/onSurface/opacity-0.08",
    "Focused": "M3/state-layers/light/onSurface/opacity-0.10",
    "Pressed": "M3/state-layers/light/onSurface/opacity-0.10"
  },
  "Prev/Next": {
    "Hovered": "M3/state-layers/light/onSurface/opacity-0.08",
    "Focused": "M3/state-layers/light/onSurface/opacity-0.10"
    // "Hovere" 是原始数据中的一个拼写错误，这里修正为 "Hovered"
  }
}

// 类型(Type) -> 日期文本(Date Text)填充色
DEFINE MAP DateTextFills = {
  "Default": "M3/sys/light/on-surface",
  "Today": "M3/sys/light/primary",
  "Selected": "M3/sys/light/on-primary",
  "Selected (Middle)": "M3/sys/light/on-secondary-container",
  "Prev/Next": "M3/sys/light/on-surface-variant"
}

// 类型(Type) -> 特定的容器属性
DEFINE MAP ContainerStyles = {
  "Today": {
    strokeWeight: 1,
    strokeAlign: "INSIDE",
    stroke: "M3/sys/light/on-surface" // 默认值，在特定状态下会被覆盖
  },
  "Selected": {
    fill: "M3/sys/light/primary"
  }
}

// ----------------------------------------------------------------
// 3. 定义变量和生成逻辑 (Variables & Generation Logic)
//    使用循环和条件语句来组合常量和查找表，生成所有变体。
// ----------------------------------------------------------------

// 定义所有存在的变体组合
DEFINE LIST Variants = [
  // 注意：原始数据中 "Prev/Next" state "Hovere" 已被修正为 "Hovered"
  { type: "Default", state: "Enabled" }, { type: "Default", state: "Hovered" }, { type: "Default", state: "Focused" }, { type: "Default", state: "Pressed" }, { type: "Default", state: "Disabled" },
  { type: "Today", state: "Enabled" }, { type: "Today", state: "Hovered" }, { type: "Today", state: "Focused" }, { type: "Today", state: "Pressed" }, { type: "Today", state: "Disabled" },
  { type: "Selected", state: "Enabled" }, { type: "Selected", state: "Hovered" }, { type: "Selected", state: "Focused" }, { type: "Selected", state: "Pressed" },
  { type: "Selected (Middle)", state: "Enabled" }, { type: "Selected (Middle)", state: "Hovered" }, { type: "Selected (Middle)", state: "Focused" }, { type: "Selected (Middle)", state: "Pressed" },
  { type: "Prev/Next", state: "Enabled" }, { type: "Prev/Next", state: "Hovered" }, { type: "Prev/Next", state: "Focused" },
  { type: "Null", state: "Enabled" }
]

// 创建根组件集
CREATE COMPONENT_SET ".Building Blocks/Local M3 calendar cell" with properties {
  cornerRadius: 5
}

// 循环生成每个变体
FOR EACH variant IN Variants:
  LET type = variant.type
  LET state = variant.state
  
  // -- A. 创建主组件 (COMPONENT) --
  CREATE COMPONENT named "Type=${type}, State=${state}" with properties {
    ...BASE_COMPONENT_PROPS, // 展开基础属性
    itemSpacing: (type == "Null" ? 8 : (type == "Selected (Middle)" ? UNDEFINED : 10)),
    layoutMode: (type IN ["Selected", "Selected (Middle)"] AND state == "Enabled") ? "VERTICAL" : UNDEFINED,
    constraints: (type == "Selected" ? "TOP CENTER" : "TOP SCALE")
  } AS component

  // -- B. 根据状态(State)应用顶级属性 --
  IF state == "Disabled":
    component.properties.opacity = OPACITY_DISABLED
  END IF
  
  // -- C. 处理特殊变体结构 --
  IF type == "Null":
    // Null 类型有完全不同的结构
    component.properties.layoutSizing = "HUG"
    component.properties.padding = 4
    LET container = CREATE FRAME "container" inside component with properties { ...BASE_CONTAINER_PROPS }
    LET stateLayer = CREATE FRAME "state-layer" inside container with properties { ...BASE_STATELAYER_PROPS, padding: 10 }
    CREATE RECTANGLE "Empty container" inside stateLayer with properties {
      layoutSizing: "FIXED", constraints: "SCALE SCALE", width: 22, height: 24
    }
    CONTINUE_LOOP // 处理下一个变体

  ELSE IF type == "Selected (Middle)":
    // "Selected (Middle)" 类型有范围高亮层
    LET rangeFill = "M3/sys/light/secondary-container"
    CREATE RECTANGLE "Range highlight end" inside component with props { fill: rangeFill, width: 38.4, height: 40, layoutSizing: "FIXED", constraints: "CENTER SCALE" }
    CREATE RECTANGLE "Range highlight middle" inside component with props { fill: rangeFill, width: 40, height: 40, layoutSizing: "FIXED", constraints: "CENTER CENTER" }
    CREATE RECTANGLE "Range highlight start" inside component with props { fill: rangeFill, width: 38.4, height: 40, layoutSizing: "FIXED", constraints: "CENTER SCALE" }
  END IF

  // -- D. 创建通用子节点 (container, state-layer, Date) --
  // 注意: "Selected (Middle)" 没有 "container" 层，它的 "state-layer" 直接在组件下
  LET parentNode = component
  IF type != "Selected (Middle)":
    CREATE FRAME "container" inside component with properties {
      ...BASE_CONTAINER_PROPS,
      cornerRadius: (type != "Prev/Next" or state != "Enabled") ? CONTAINER_RADIUS : UNDEFINED,
      ...ContainerStyles[type] // 应用类型相关的样式
    } AS container
    
    // 特殊状态覆盖容器样式
    IF type == "Today" AND state != "Disabled":
      container.properties.stroke = "M3/sys/light/primary"
    END IF
    
    // Prev/Next 类型在特定状态下有背景色
    IF type == "Prev/Next" AND state != "Enabled":
      container.properties.fill = StateLayerFills["Prev/Next"][state]
    END IF
    
    parentNode = container
  END IF

  CREATE FRAME "state-layer" inside parentNode with properties {
    ...BASE_STATELAYER_PROPS,
    cornerRadius: (type == "Selected (Middle)" OR (type == "Default" AND state == "Focused")) ? CONTAINER_RADIUS : UNDEFINED,
    padding: (type IN ["Today", "Prev/Next"]) ? 10 : UNDEFINED,
    fill: StateLayerFills[type] ? StateLayerFills[type][state] : UNDEFINED
  } AS stateLayer

  CREATE TEXT "Date" inside stateLayer with properties {
    ...BASE_DATE_TEXT_PROPS,
    fill: DateTextFills[type]
  } AS dateText

  // 特殊情况下的文本样式覆盖
  IF type == "Prev/Next" AND state == "Enabled":
    dateText.properties.opacity = OPACITY_DISABLED
  ELSE IF type == "Prev/Next" AND state != "Enabled":
    // 在 Hovered/Focused 状态下，Prev/Next 文本颜色不同
    dateText.properties.fill = "M3/sys/light/on-surface-variant"
  END IF
  
  // -- E. 添加额外的子节点 (Ripple) --
  IF state == "Pressed":
    IF type == "Default":
      CREATE VECTOR "Ripple" inside stateLayer with props {
        fill: "M3/state-layers/light/primary/opacity-0.16", width: 50, height: 35, layoutSizing: "FIXED", constraints: "BOTTOM RIGHT"
      }
    ELSE IF type == "Selected (Middle)":
       CREATE VECTOR "Ripple" inside stateLayer with props {
        fill: "M3/state-layers/light/primary/opacity-0.16", width: 50, height: 35, layoutSizing: "FIXED", constraints: "SCALE SCALE"
      }
    END IF
  END IF

END LOOP