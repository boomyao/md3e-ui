// Component: HorizontalCard
// 这是一个组件集，包含三种风格变体。
ComponentSet HorizontalCard {
  // --- PROPS (属性) ---
  // style: 'Outlined' | 'Elevated' | 'Filled' (默认: 'Outlined')

  // --- SIZING & STYLE (尺寸与样式) ---
  width: 360px;
  height: 80px;
  border-radius: 16px; // 外层容器的圆角，但实际由内部元素控制

  // --- STRUCTURE (结构) ---
  // 采用分层结构：背景层 + 内容层
  // 背景层(Background_1)和内容层(Content)绝对定位堆叠

  // 1. 背景层 (负责视觉样式)
  Layer Background {
    position: absolute;
    top: 0; left: 0;
    width: 100% (360px);
    height: 100% (80px);
    border-radius: 12px;

    // 根据 style prop 切换样式
    style.case('Outlined'): {
      background-color: token('M3/sys/light/surface');
      border: 1px solid token('M3/sys/light/outline-variant');
    }
    style.case('Elevated'): {
      background-color: token('M3/sys/light/surface-container-low');
      // 通常还会伴随阴影 (box-shadow)，这里数据未体现
    }
    style.case('Filled'): {
      background-color: token('M3/sys/light/surface-container-highest');
    }

    // 内部还有一个 State-layer 用于实现交互状态（如-涟漪效果）
    // 这里简化，不展开
  }

  // 2. 内容层 (负责内容布局)
  Layer Content {
    // --- LAYOUT & SIZING ---
    // 这是一个 flex 容器，水平排列
    display: flex;
    flex-direction: row;
    width: 100%;             // 宽度撑满父容器 (layoutSizing: FILL)
    height: 'hug-content';   // 高度由内容决定 (layoutSizing: HUG)
    flex-grow: 1;            // 在父级 flex 容器中自动伸展

    // 内部布局分为 "内容插槽" 和 "媒体区"
    // --- CHILDREN (子元素) ---

    // 2a. 内容插槽 (左侧区域)
    Container ContentSlot {
      // --- LAYOUT & SIZING ---
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;           // 子元素间距 (itemSpacing)
      padding: 16px;
      flex-grow: 1;          // 占据剩余空间 (layoutGrow: 1)
      width: 'fill-container'; // (layoutSizing: FILL)

      // --- CHILDREN (子元素) ---
      // 头像
      Component Avatar {
        width: 40px;
        height: 40px;
        // 内部是一个圆形(Ellipse)背景 + 居中的文本(Initial 'A')
        // background-color: token('M3/sys/light/primary-container');
        // color: token('M3/sys/light/on-primary-container');
      }

      // 文本容器
      Container TextBlock {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex-grow: 1;              // 占据 Avatar 之外的剩余空间
        width: 'fill-container';   // 宽度撑满
        height: 'hug-content';     // 高度自适应

        // --- CHILDREN (子元素) ---
        Element Header {
          font: token('M3/title/medium');
          color: token('M3/sys/light/on-surface');
          width: 'fill-container';
        }
        Element Subhead {
          font: token('M3/body/medium');
          color: token('M3/sys/light/on-surface');
          width: 'fill-container';
        }
      }
    }

    // 2b. 媒体区 (右侧区域)
    Container Media {
      // --- LAYOUT & SIZING ---
      width: 80px;            // 固定宽度 (layoutSizing: FIXED)
      height: 100%;           // 高度撑满 (layoutSizing: FILL)
      flex-shrink: 0;         // 防止被压缩
      border: 1px solid token('M3/sys/light/outline-variant'); // 有一个外边框

      // 内部是一个占位图(Rectangle)，随容器缩放
      // background-image: token('M3/.add-on/placeholder image');
    }
  }
}