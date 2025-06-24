// 定义可变的属性列表
// Define lists of variant properties
TYPES = ["Square", "Round"]
SIZES = ["XLarge", "Large", "Medium", "Small", "XSmall"]
STYLES = ["Standard", "Outline", "Tonal", "Filled"]
WIDTHS = ["Wide", "Default", "Narrow"]

// 定义颜色和描边等样式常量
// Define color and stroke style constants
COLOR_OUTLINE = "M3/sys/light/outline-variant"
COLOR_TONAL_FILL = "M3/sys/light/secondary-container"
COLOR_FILLED_FILL = "M3/sys/light/primary"

// 尺寸相关属性查找表 (映射 Size 到具体数值)
// Map for size-dependent properties
SIZE_PROPERTIES_MAP = {
  "XLarge": {
    componentLayoutSizing: "HUG",
    containerHeight: 136,
    iconSize: 40,
    outlineStrokeWeight: 2,
    tonalPadding: 48
  },
  "Large": {
    componentLayoutSizing: "HUG",
    containerHeight: 96,
    iconSize: 32,
    outlineStrokeWeight: 2,
    tonalPadding: 32
  },
  "Medium": {
    componentLayoutSizing: "HUG",
    containerHeight: 56,
    iconSize: 24,
    outlineStrokeWeight: 1,
    tonalPadding: 16
  },
  "Small": {
    componentLayoutSizing: "FIXED",
    componentWidth: 48,  // 特殊的固定宽度
    componentHeight: 48, // 特殊的固定高度
    containerHeight: 40,
    iconSize: 24,
    outlineStrokeWeight: 1,
    tonalPadding: 10
  },
  "XSmall": {
    componentLayoutSizing: "FIXED",
    componentWidth: 48,  // 特殊的固定宽度
    componentHeight: 48, // 特殊的固定高度
    containerHeight: 32,
    iconSize: 20,
    outlineStrokeWeight: 1,
    tonalPadding: 10
  }
}

// 容器宽度查找表 (映射 Size 和 Width 到具体数值)
// Map for container width, dependent on Size and Width
CONTAINER_WIDTH_MAP = {
  "XLarge": { "Wide": 184, "Default": 136, "Narrow": 104 },
  "Large":  { "Wide": 128, "Default": 96,  "Narrow": 64  },
  "Medium": { "Wide": 72,  "Default": 56,  "Narrow": 48  },
  "Small":  { "Wide": 52,  "Default": 40,  "Narrow": 32  },
  "XSmall": { "Wide": 40,  "Default": 32,  "Narrow": 28  }
}

// 方形按钮圆角查找表 (映射 Size 到具体数值)
// Map for corner radius of "Square" type buttons, dependent on Size
SQUARE_CORNER_RADIUS_MAP = {
  "XLarge": 28,
  "Large":  28,
  "Medium": 16,
  "Small":  12,
  "XSmall": 12
}

// 圆形按钮的固定圆角值
// Constant for corner radius of "Round" type buttons
ROUND_CORNER_RADIUS = 100

// 创建一个空的组件集
// Create an empty component set
ComponentSet "Icon button" {

  // 遍历所有属性组合来生成每个变体
  // Loop through all property combinations to generate each variant
  FOR each type IN TYPES
    FOR each size IN SIZES
      FOR each style IN STYLES
        FOR each width IN WIDTHS

          // ---- 数据准备 (Data Preparation) ----
          // 从查找表中获取当前组合的属性值
          // Get property values for the current combination from the maps
          sizeProps = SIZE_PROPERTIES_MAP[size]
          containerWidth = CONTAINER_WIDTH_MAP[size][width]

          // 根据 Type 计算圆角
          // Calculate corner radius based on Type
          IF type == "Square" THEN
            cornerRadius = SQUARE_CORNER_RADIUS_MAP[size]
          ELSE
            cornerRadius = ROUND_CORNER_RADIUS
          END IF

          // ---- 组件定义 (Component Definition) ----
          // 创建一个新组件
          // Create a new component
          Component {
            // 动态生成组件名称
            // Dynamically generate the component name
            name: "Type=${type}, Size=${size}, Style=${style}, Width=${width}"

            // ---- 顶级组件属性 (Top-Level Component Properties) ----
            properties: {
              layoutSizing: sizeProps.componentLayoutSizing,
              alignItems: "CENTER",
              constraints: "CENTER CENTER"
            }

            // 对 Small 和 XSmall 尺寸应用特殊的固定宽高
            // Apply special fixed width/height for Small and XSmall sizes
            IF sizeProps.componentWidth IS NOT NULL THEN
              properties.width = sizeProps.componentWidth
              properties.height = sizeProps.componentHeight
              
              // 特殊情况：当 Size=Small, Width=Wide 时，组件宽度为 52
              // Edge case: when Size=Small and Width=Wide, component width is 52
              IF size == "Small" AND width == "Wide" THEN
                 properties.width = 52
              END IF
            END IF

            // ---- Content 层 (Content Layer) ----
            Children [
              Instance "Content" {
                properties: {
                  layoutMode: "VERTICAL",
                  layoutSizing: ["FIXED", "HUG"],
                  alignItems: "CENTER",
                  cornerRadius: cornerRadius,
                  width: containerWidth
                }

                // ---- 根据 Style 应用不同属性 (Apply properties based on Style) ----
                IF style == "Outline" THEN
                  properties.strokeWeight = sizeProps.outlineStrokeWeight
                  properties.strokeAlign = "INSIDE"
                  properties.stroke = COLOR_OUTLINE

                ELSE IF style == "Tonal" THEN
                  properties.fill = COLOR_TONAL_FILL

                ELSE IF style == "Filled" THEN
                  properties.fill = COLOR_FILLED_FILL
                END IF

                // ---- State-layer 层 (State-layer Layer) ----
                Children [
                  Frame "State-layer" {
                    properties: {
                      layoutSizing: ["FILL", "FIXED"],
                      alignItems: "CENTER",
                      height: sizeProps.containerHeight
                    }

                    // Tonal 样式有特殊的 padding
                    // Tonal style has special padding
                    IF style == "Tonal" THEN
                      // 特殊情况：当 Size=Medium, Width=Wide 时，有水平和垂直 padding
                      // Edge case: when Size=Medium and Width=Wide, has horizontal and vertical padding
                      IF size == "Medium" AND width == "Wide" THEN
                        properties.padding = [16, 32] // [vertical, horizontal]
                      ELSE
                        properties.padding = sizeProps.tonalPadding // all sides
                      END IF
                    END IF
                    
                    // ---- Icon 层 (Icon Layer) ----
                    Children [
                      Icon "stars" {
                        properties: {
                          layoutSizing: "FIXED",
                          width: sizeProps.iconSize,
                          height: sizeProps.iconSize
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        END FOR
      END FOR
    END FOR
  END FOR
}