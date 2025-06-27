// =================================================================
// 4. 布局与样式伪代码 (Layout & Style Pseudocode)
// =================================================================
// Let's think in terms of CSS. This describes the visual rules for the TimePicker.

Component TimePicker {

  // -------------------------------------
  // 4.1 顶级容器 (The Dialog Frame)
  // -------------------------------------
  // This is the main window of the picker.
  // Its size changes based on the 'Orientation' prop.
  
  Style (self) {
    display: flex;
    flex-direction: column;
    
    // Conditional sizing based on Orientation prop
    width: (props.Orientation == "Horizontal") ? 572px : 328px;
    height: (props.Orientation == "Horizontal") ? 384px : 520px;
    
    background-color: var(--m3-surface-container-high);
    border-radius: 28px;
    overflow: hidden; // Ensures content respects the rounded corners
  }

  // -------------------------------------
  // 4.2 头部区域 (Header)
  // -------------------------------------

  Section Header {
    Style {
      // 'layoutSizing: [FILL, HUG]' -> Fills width, height wraps content
      width: 100%; 
      height: auto;
      padding: 24px 24px 0;
    }
    
    .Title {
      Style {
        // 'text: "M3/label/medium"' -> Use the typography token
        font: var(--m3-label-medium); 
        // 'fill: "..."' -> Use the color token
        color: var(--m3-on-surface-variant);
      }
    }
  }

  // -------------------------------------
  // 4.3 主要内容区域 (Main Content)
  // -------------------------------------
  // This is the most dynamic part. Its layout flips with the 'Orientation'.

  Section MainContent {
    Style {
      flex-grow: 1; // Takes up remaining vertical space
      display: flex;
      align-items: center;
      padding: 0 24px;
      
      // Conditional layout logic
      if (props.Orientation == "Horizontal") {
        flex-direction: row;
        justify-content: center;
        gap: 52px; // Space between TimeDisplay and ClockFace
      } else { // Vertical
        flex-direction: column;
        justify-content: flex-start;
        gap: 36px;
      }
    }

    // 4.3.1 数字时间输入区 (TimeDisplay)
    .TimeDisplay {
      Style {
        display: flex;
        align-items: center;
      }
      
      .Input {
        // This is the container for the hour/minute number, e.g., 'Hour_Input'
        Style {
          // 'layoutMode: VERTICAL', 'alignItems: CENTER'
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 96px;
          
          .NumberContainer { // Represents the 'selected' or 'default' frame
            Style {
              display: grid;
              place-items: center;
              width: 100%;
              height: 80px;
              border-radius: 8px;
              font: var(--m3-display-large); // Large font for the time
            }
            
            // State-based styling
            &.selected {
              background-color: var(--m3-primary-container);
              color: var(--m3-on-primary-container);
            }
            &.default {
              background-color: var(--m3-surface-container-highest);
              color: var(--m3-on-surface);
            }
          }
        }
      }
      
      .AmPmToggle { // Appears only when props.Format == '12h'
        Style {
          display: flex;
          border: 1px solid var(--m3-outline);
          border-radius: 8px;
          overflow: hidden;
          
          // In vertical mode, it's a column
          if (props.Orientation == "Vertical") {
            flex-direction: column;
          }
        }
        .Button {
          // ... styles for AM/PM buttons, with a 'selected' state changing background
        }
      }
    }

    // 4.3.2 表盘选择区 (ClockFace)
    .ClockFace {
      Style {
        position: relative; // Crucial for placing numbers absolutely
        width: 256px;
        height: 256px;
        background-color: var(--m3-surface-container-highest);
        border-radius: 50%; // 'cornerRadius: 500' creates a perfect circle
      }
      
      .Hour {
        Style {
          position: absolute; // Positioned via transform: rotate(...) translate(...);
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font: var(--m3-body-large);
          transition: background-color 0.2s, color 0.2s; // Smooth state changes
        }
        
        // State-based styling for the numbers on the clock
        &.selected {
          background-color: var(--m3-primary);
          color: var(--m3-on-primary);
        }
        &.default {
          background-color: transparent;
          color: var(--m3-on-surface);
        }
      }
      
      .Line { // The line pointing to the selected hour
        Style {
          position: absolute;
          // ... calculated rotation and length based on selected time
          background-color: var(--m3-primary);
          height: 2px;
        }
      }
    }
  }

  // -------------------------------------
  // 4.4 操作按钮区域 (Actions)
  // -------------------------------------
  
  Section Actions {
    Style {
      width: 100%;
      display: flex;
      // 'alignItems: [SPACE_BETWEEN, CENTER]'
      justify-content: space-between;
      align-items: center;
      padding: 0 24px 20px 12px; // Asymmetrical padding
    }
    
    .IconButton { /* ... for keyboard icon */ } ref: IconButton & KeyboardIcon
    .TextButton { /* ... for Cancel/OK */ } ref: ButtonComponent(variant: text)
  }
}