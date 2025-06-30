// --- COMPONENT API (组件接口) ---
Component: StackedCard

props {
  // 核心样式变体，决定卡片的背景和边框
  style: "Outlined" | "Elevated" | "Filled" (default: "Outlined")

  // --- Header 部分 ---
  avatarInitial: String         // e.g., "A"
  headerText: String            // e.g., "Header"
  subheadText: String           // e.g., "Subhead"
  // ... 更多 Header 配置，如 "onMoreIconClick" 事件回调

  // --- Content 部分 ---
  mediaImage: ImageURL          // 媒体区域的图片源 (通过占位符隐喻)
  titleText: String             // e.g., "Title"
  subtitleText: String          // e.g., "Subtitle"
  supportingText: String        // e.g., "Lorem ipsum dolor..."

  // --- Actions 部分 ---
  primaryActionLabel: String    // e.g., "Label"
  secondaryActionLabel: String  // e.g., "Label"
  showSecondaryAction: Boolean  // 控制次要操作按钮的显示/隐藏
  // ... 更多 Actions 配置, 如 "onPrimaryClick", "onSecondaryClick" 事件回调
}

// --- INTERNAL STRUCTURE (内部结构) ---
StackedCard(width: 360px, height: 480px, borderRadius: 12px) {
  // 1. 背景层 (绝对定位，铺满整个组件)
  BackgroundLayer(style=props.style)

  // 2. 内容层 (垂直布局，撑满容器)
  ContentWrapper(layout=vertical, layoutGrow=1) {

    // 2.1 头部区域
    Header(layout=horizontal, padding: [16, 12, 4, 12], height: 72px, align=center, justify=space-between) {
      // 左侧：头像 + 文本
      LeftContent(layout=horizontal, itemSpacing: 16px, align=center) {
        Avatar(size: 40x40, shape: circle)
        TextGroup(layout=vertical, itemSpacing: 4px, width: 236px) {
          HeaderText(font: M3/title/medium)
          SubheadText(font: M3/body/medium)
        }
      }
      // 右侧：更多操作图标
      MoreIconButton(size: 48x48) {
        Icon(name: more_vert, size: 24x24)
      }
    }

    // 2.2 媒体区域 (固定高度的图片容器)
    Media(layout=fill-container, height: 188px) {
      Image(fill: placeholder-color) // 宽度撑满，高度固定
    }

    // 2.3 文本与操作区域
    TextContent(layout=vertical, itemSpacing: 32px, padding: 16px) {
      // 标题与副标题
      HeadlineGroup(layout=vertical) {
        Title(font: M3/body/large)
        Subhead(font: M3/body/medium, color: on-surface-variant)
      }
      // 辅助性文本
      SupportingText(font: M3/body/medium, color: on-surface-variant)

      // 操作按钮区域
      Actions(layout=horizontal, itemSpacing: 8px, justify=flex-end, height: 40px) {
        // 次要按钮 (轮廓样式)
        if (props.showSecondaryAction) {
          SecondaryButton(style: "Outline", label: props.secondaryActionLabel)
        }
        // 主要按钮 (填充样式)
        PrimaryButton(style: "Filled", label: 'Action 1' /* 这里应为 props.primaryActionLabel */)
      }
    }
  }
}

// --- STYLE VARIANTS (样式变体定义) ---

// 变体 1: Outlined (描边)
when props.style == "Outlined" {
  BackgroundLayer {
    background-color: token("M3/sys/light/surface");
    border: 1px solid token("M3/sys/light/outline-variant");
  }
}

// 变体 2: Elevated (悬浮)
when props.style == "Elevated" {
  BackgroundLayer {
    background-color: token("M3/sys/light/surface-container-low");
    // 通常会伴随阴影 (elevation shadow), 数据中未明确提供，但 "Elevated" 命名暗示了这一点
    box-shadow: elevation-level-1;
  }
}

// 变体 3: Filled (填充)
when props.style == "Filled" {
  BackgroundLayer {
    background-color: token("M3/sys/light/surface-container-highest");
  }
}