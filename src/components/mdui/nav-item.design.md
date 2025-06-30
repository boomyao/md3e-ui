// 组件的 API 接口定义
interface NavItemProps {
  orientation: 'horizontal' | 'vertical'; // 新增：方向属性
  selected: boolean;
  badgeType: 'large' | 'small' | 'none';
  badgeLabel?: string;
  state: 'enabled' | 'hovered' | 'focused' | 'pressed';
  icon: IconType;
  label: string;
}

// 组件名: NavItem
// 描述: 一个统一的导航项组件，支持水平和垂直两种布局。
// - 'horizontal': 用于水平导航栏，图标和标签垂直排列，并被一个“药丸”形状的背景包裹。
// - 'vertical': 用于垂直导航栏（如Navigation Rail），图标和标签垂直排列，但只有图标有背景。

function NavItem({ orientation, selected, badgeType, state, badgeLabel, icon, label }) {

  // --- 派生状态和样式 (Derived States & Styles) ---
  const isSelected = selected === true;
  const interactionOpacity = (state === 'hovered') ? 0.08 :
                             (state === 'focused' || state === 'pressed') ? 0.10 : 0;

  // 根据方向选择性渲染
  if (orientation === 'horizontal') {
    // --- 水平布局渲染 (Horizontal Rendering) ---
    return (
      // 1. 根容器 (Root Container)
      <Wrapper style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: 'hug-content',
      }}>
        {/* 2. 内容和状态容器 (Content & State Container) */}
        <PillContainer style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px',
          borderRadius: 20,
          gap: 4,
          backgroundColor: isSelected ? 'M3.sys.light.secondary-container' : 'transparent',
        }}>
          {/* 2a. 图标 (Icon) */}
          <Icon name={icon} size={24} style={{
            color: isSelected ? 'M3.sys.light.on-secondary-container' : 'M3.sys.light.on-surface-variant',
          }} />
          {/* 2b. 标签文本 (Label Text) */}
          <LabelText style={{
            fontSize: 'M3.label.medium',
            color: isSelected ? 'M3.sys.light.on-secondary-container' : 'M3.sys.light.on-surface-variant',
          }}>
            {label}
          </LabelText>
          {/* 2c. 状态层 (State Layer) */}
          <StateOverlay style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 20,
            backgroundColor: `rgba(onSecondaryContainer, ${interactionOpacity})`,
          }} />
          {/* 2d. 徽标 (Badge) */}
          {badgeType === 'large' &&
            <LargeBadge label={badgeLabel} style={{ position: 'absolute', top: 6, left: 28 }} />
          }
          {badgeType === 'small' &&
            <SmallBadge style={{ position: 'absolute', top: 8, left: 34 }} />
          }
        </PillContainer>
      </Wrapper>
    );
  } else { // orientation === 'vertical'
    // --- 垂直布局渲染 (Vertical Rendering) ---
    return (
      // 1. 根容器 (Root Container)
      <Container style={{
        layout: 'vertical',
        alignItems: 'center',
        padding: '6px 0',
        gap: 4,
      }}>
        {/* 2. 图标区域 (Icon Area) */}
        <IconWrapper style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 32,
          borderRadius: 16,
          backgroundColor: isSelected ? 'M3.sys.light.secondary-container' : 'transparent',
        }}>
          {/* 2a. 状态层 (State Layer) */}
          <StateOverlay style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: isSelected ? `rgba(onSecondaryContainer, ${interactionOpacity})` : `rgba(onSurface, ${interactionOpacity})`,
          }} />
          {/* 2b. 图标本体 (Icon) */}
          <Icon name={icon} size={24} style={{ zIndex: 1 }}/>
          {/* 2c. 徽标 (Badge) */}
          {badgeType === 'large' &&
            <LargeBadge label={badgeLabel} style={{
              position: 'absolute',
              top: 2,
              left: 28,
              backgroundColor: 'M3.sys.light.error',
            }} />
          }
          {badgeType === 'small' &&
            <SmallBadge style={{
              position: 'absolute',
              top: 4,
              left: 34,
              backgroundColor: 'M3.sys.light.error',
            }} />
          }
        </IconWrapper>
        {/* 3. 标签文本 (Label Text) */}
        <LabelText style={{
          fontSize: 'M3.label.medium',
          color: isSelected ? 'M3.sys.light.on-secondary-container' : 'M3.sys.light.on-surface-variant',
        }}>
          {label}
        </LabelText>
      </Container>
    );
  }
}
