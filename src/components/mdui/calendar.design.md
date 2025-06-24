// --- Constants: 定义设计系统中的核心样式和资源 ---

// 颜色映射表 (Color Map)
DEFINE M3_COLORS = {
  SURFACE_CONTAINER_HIGH: "M3/sys/light/surface-container-high",
  ON_SURFACE: "M3/sys/light/on-surface",
  ON_SURFACE_VARIANT: "M3/sys/light/on-surface-variant",
  PRIMARY: "M3/sys/light/primary",
  ON_PRIMARY: "M3/sys/light/on-primary"
}

// 文本样式映射表 (Text Style Map)
DEFINE M3_TEXT_STYLES = {
  LABEL_LARGE: "M3/label/large",
  BODY_LARGE: "M3/body/large"
}

// 图标映射表 (Icon Map)
DEFINE ICONS = {
  PREVIOUS: "navigate_before",
  NEXT: "navigate_next",
  DROPDOWN: "arrow_drop_down"
}

// 星期标签 (Days of the Week Labels)
// 在实际UI中，通常使用单个字母以节省空间
DEFINE DAYS_OF_WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"]

// 月份选项 (Month Options)
DEFINE MONTH_OPTIONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// --- State Variables: 定义日历的当前状态 ---

VAR currentYear = 2025
VAR currentMonth = "Aug" // 也可以是索引，如 7
VAR selectedDate = 17

// --- Data Structure: 定义日历网格的数据模型 ---
// 这个二维数组代表了整个可见的日历网格。
// 在一个真实的应用程序中，这个数据结构会根据 `currentYear` 和 `currentMonth` 动态生成。
// 每个对象代表一个日期单元格，包含其所有必要信息。

DEFINE CALENDAR_GRID_DATA = [
  // Week 1
  [
    { date: 26, type: "PREV_MONTH" }, { date: 27, type: "PREV_MONTH" }, { date: 28, type: "PREV_MONTH" },
    { date: 29, type: "PREV_MONTH" }, { date: 30, type: "PREV_MONTH" }, { date: 31, type: "PREV_MONTH" },
    { date: 1,  type: "CURRENT_MONTH" }
  ],
  // Week 2 (数据中省略，此处为逻辑补充)
  [
    { date: 2,  type: "CURRENT_MONTH" }, { date: 3,  type: "CURRENT_MONTH" }, { date: 4,  type: "CURRENT_MONTH" },
    { date: 5,  type: "CURRENT_MONTH" }, { date: 6,  type: "CURRENT_MONTH" }, { date: 7,  type: "CURRENT_MONTH" },
    { date: 8,  type: "CURRENT_MONTH" }
  ],
  // Week 3 (数据中省略，此处为逻辑补充)
  [
    { date: 9,  type: "CURRENT_MONTH" }, { date: 10, type: "CURRENT_MONTH" }, { date: 11, type: "CURRENT_MONTH" },
    { date: 12, type: "CURRENT_MONTH" }, { date: 13, type: "CURRENT_MONTH" }, { date: 14, type: "CURRENT_MONTH" },
    { date: 15, type: "CURRENT_MONTH" }
  ],
  // Week 4
  [
    { date: 16, type: "CURRENT_MONTH" }, { date: 17, type: "SELECTED" },      { date: 18, type: "CURRENT_MONTH" },
    { date: 19, type: "CURRENT_MONTH" }, { date: 20, type: "CURRENT_MONTH" }, { date: 21, type: "CURRENT_MONTH" },
    { date: 22, type: "CURRENT_MONTH" }
  ],
  // Week 5
  [
    { date: 23, type: "CURRENT_MONTH" }, { date: 24, type: "CURRENT_MONTH" }, { date: 25, type: "CURRENT_MONTH" },
    { date: 26, type: "CURRENT_MONTH" }, { date: 27, type: "CURRENT_MONTH" }, { date: 28, type: "CURRENT_MONTH" },
    { date: 29, type: "CURRENT_MONTH" }
  ],
  // Week 6
  [
    { date: 30, type: "CURRENT_MONTH" }, { date: 1,  type: "NEXT_MONTH" },  { date: 2,  type: "NEXT_MONTH" },
    { date: 3,  type: "NEXT_MONTH" },  { date: 4,  type: "NEXT_MONTH" },  { date: 5,  type: "NEXT_MONTH" },
    { date: 6,  type: "NEXT_MONTH" }
  ]
]

// --- Rendering Logic: 定义如何构建UI组件 ---

// 主构建函数
FUNCTION BuildCalendarComponent():
  // 1. 创建主容器 (Frame)
  VAR calendarContainer = new FRAME({
    layoutMode: "VERTICAL",
    cornerRadius: 16,
    fill: M3_COLORS.SURFACE_CONTAINER_HIGH
  })

  // 2. 构建并添加头部选择器行
  calendarContainer.add(BuildSelectionRow())

  // 3. 构建并添加日历网格
  calendarContainer.add(BuildCalendarGrid())

  // 4. 构建并添加底部操作按钮
  calendarContainer.add(BuildActionsRow())

  RETURN calendarContainer
END FUNCTION


// 辅助函数: 构建月份/年份选择器
FUNCTION BuildSelector(currentValue, options, onPrevClick, onNextClick):
  VAR selectorContainer = new FRAME({ layout: "HORIZONTAL", alignItems: "CENTER" })

  selectorContainer.add(new IconButton({ icon: ICONS.PREVIOUS, onClick: onPrevClick }))
  selectorContainer.add(new MenuButton({ label: currentValue, options: options, icon: ICONS.DROPDOWN }))
  selectorContainer.add(new IconButton({ icon: ICONS.NEXT, onClick: onNextClick }))
  
  RETURN selectorContainer
END FUNCTION


// 辅助函数: 构建整个头部
FUNCTION BuildSelectionRow():
  VAR headerRow = new FRAME({ layout: "HORIZONTAL", alignItems: "SPACE_BETWEEN", height: 64 })
  
  // 假设有 onMonthChange 和 onYearChange 的处理函数
  VAR monthSelector = BuildSelector(currentMonth, MONTH_OPTIONS, onMonthChange.prev, onMonthChange.next)
  VAR yearSelector = BuildSelector(currentYear, [2024, 2025, 2026], onYearChange.prev, onYearChange.next)

  headerRow.add(monthSelector)
  headerRow.add(yearSelector)
  
  RETURN headerRow
END FUNCTION


// 辅助函数: 构建日历网格（星期标题 + 日期）
FUNCTION BuildCalendarGrid():
  VAR gridContainer = new FRAME({ layout: "VERTICAL", padding: [0, 12, 4] })

  // A. 创建星期标题行
  VAR weekHeaderRow = new FRAME({ layout: "HORIZONTAL" })
  FOR dayLabel IN DAYS_OF_WEEK_LABELS:
    VAR dayCell = new FRAME({ width: 48, height: 48, alignItems: "CENTER" })
    dayCell.add(new TEXT({ 
      text: dayLabel, 
      style: M3_TEXT_STYLES.BODY_LARGE, 
      color: M3_COLORS.ON_SURFACE 
    }))
    weekHeaderRow.add(dayCell)
  END FOR
  gridContainer.add(weekHeaderRow)

  // B. 使用循环创建所有日期行
  FOR weekData IN CALENDAR_GRID_DATA:
    VAR weekRow = new FRAME({ layout: "HORIZONTAL" })
    FOR dayData IN weekData:
      // 根据日期类型获取样式
      VAR dayStyle = GetDayStyle(dayData.type)
      
      // 创建日期按钮
      weekRow.add(new Button({
        text: dayData.date,
        type: dayStyle.buttonType, // e.g., "Filled", "Text"
        textColor: dayStyle.textColor,
        opacity: dayStyle.opacity,
        width: 48,
        height: 48
      }))
    END FOR
    gridContainer.add(weekRow)
  END FOR

  RETURN gridContainer
END FUNCTION


// 辅助函数: 根据日期类型返回对应的样式
FUNCTION GetDayStyle(dayType):
  SWITCH dayType:
    CASE "SELECTED":
      RETURN { buttonType: "Filled", textColor: M3_COLORS.ON_PRIMARY, opacity: 1.0 }
    CASE "CURRENT_MONTH":
      RETURN { buttonType: "Text", textColor: M3_COLORS.ON_SURFACE, opacity: 1.0 }
    CASE "PREV_MONTH":
    CASE "NEXT_MONTH":
      RETURN { buttonType: "Text", textColor: M3_COLORS.ON_SURFACE_VARIANT, opacity: 0.38 }
    DEFAULT:
      RETURN { buttonType: "Text", textColor: M3_COLORS.ON_SURFACE, opacity: 1.0 }
  END SWITCH
END FUNCTION


// 辅助函数: 构建底部的 "Cancel" 和 "OK" 按钮
FUNCTION BuildActionsRow():
  VAR actionsRow = new FRAME({ layout: "HORIZONTAL", alignItems: "END", padding: [4, 12] })
  
  actionsRow.add(new Button({
    label: "Cancel",
    style: "Text",
    textColor: M3_COLORS.PRIMARY
  }))

  actionsRow.add(new Button({
    label: "OK",
    style: "Text",
    textColor: M3_COLORS.PRIMARY
  }))

  RETURN actionsRow
END FUNCTION