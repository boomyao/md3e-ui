// =================================================================
// 1. 定义常量 (CONSTANTS)
// =================================================================

// -- 颜色和样式 Token --
DEFINE COLOR_PRIMARY = "M3/sys/light/primary"
DEFINE COLOR_ERROR = "M3/sys/light/error"
DEFINE COLOR_ON_SURFACE = "M3/sys/light/on-surface"
DEFINE COLOR_ON_SURFACE_VARIANT = "M3/sys/light/on-surface-variant"
DEFINE COLOR_OUTLINE = "M3/sys/light/outline"
DEFINE COLOR_SURFACE_CONTAINER_HIGHEST = "M3/sys/light/surface-container-highest"
DEFINE COLOR_DISABLED_STROKE = "M3/state-layers/light/onSurface/opacity-0.10"
DEFINE COLOR_HOVER_FILL = "M3/state-layers/light/onSurface/opacity-0.08"
DEFINE DISABLED_OPACITY = 0.3799999952316284

// -- 文本样式 Token --
DEFINE TEXT_BODY_SMALL = "M3/body/small"
DEFINE TEXT_BODY_LARGE = "M3/body/large"

// -- 图标实例 ID --
DEFINE ICON_ID_SEARCH = "54616:25439"
DEFINE ICON_ID_CANCEL = "54616:25503"
DEFINE ICON_ID_ERROR = "54616:25507"


// =================================================================
// 2. 定义变量 (VARIABLES) - 组件的属性轴
// =================================================================

DEFINE STYLES = ["Outlined", "Filled"]
DEFINE STATES = ["Enabled", "Hovered", "Focused", "Disabled", "Error"]
DEFINE TEXT_CONFIGS = ["Placeholder text", "Label text", "Input text"]
DEFINE LEADING_ICON_OPTS = [True, False]
DEFINE TRAILING_ICON_OPTS = [True, False]


// =================================================================
// 3. 定义基础模板 (TEMPLATES)
// =================================================================

DEFINE TEMPLATES = {
  "Text_field": { type: "FRAME", properties: { layoutMode: "VERTICAL", layoutGrow: 1, itemSpacing: 10, layoutSizing: "FILL", sizingMode: "FIXED" } },
  "State-layer": { type: "FRAME", properties: { layoutGrow: 1, itemSpacing: 4, layoutSizing: "FILL", sizingMode: "FIXED", constraints: "CENTER SCALE" } },
  "Leading_icon": { type: "INSTANCE", properties: { component_Type: "Round", component_Size: "Small", component_Style: "Standard", component_Width: "Default", layoutSizing: "FIXED", sizingMode: "FIXED", alignItems: "CENTER", constraints: "CENTER LEFT", width: 48, height: 48 } },
  "Trailing_icon": { type: "INSTANCE", properties: { component_Type: "Round", component_Size: "Small", component_Style: "Standard", component_Width: "Default", layoutSizing: "FIXED", sizingMode: "FIXED", alignItems: "CENTER", constraints: "CENTER RIGHT", width: 48, height: 48 } },
  "trailing-icon-error": { type: "INSTANCE", properties: { /* ... same as Trailing_icon but with different constraints sometimes */ component_Type: "Round", component_Size: "Small", component_Style: "Standard", component_Width: "Default", layoutSizing: "FIXED", sizingMode: "FIXED", alignItems: "CENTER", width: 48, height: 48 } },
  "Icon_Content": { type: "INSTANCE", properties: { component_State: "Enabled", layoutMode: "VERTICAL", layoutSizing: ["FIXED", "HUG"], alignItems: "CENTER", cornerRadius: 100, width: 40 } },
  "Icon_State-layer": { type: "FRAME", properties: { layoutSizing: ["FILL", "FIXED"], sizingMode: "FIXED", alignItems: "CENTER", height: 40 } },
  "Icon_search": { type: "ICON", properties: { layoutSizing: "FIXED", width: 24, height: 24 } },
  "Icon_cancel": { type: "ICON", properties: { layoutSizing: "FIXED", width: 24, height: 24 } },
  "Icon_error": { type: "ICON", properties: { layoutSizing: "FIXED", width: 24, height: 24 } },
  "Content_container": { type: "FRAME", properties: { layoutMode: "VERTICAL", layoutGrow: 1, layoutSizing: ["FILL", "FIXED"], sizingMode: "FIXED", padding: [4, 0], height: 48 } },
  "Placeholder_text_container": { type: "FRAME", properties: { layoutSizing: ["FILL", "HUG"] } },
  "Placeholder_text": { type: "TEXT", properties: { layoutGrow: 1, layoutSizing: ["FILL", "HUG"], constraints: "CENTER LEFT_RIGHT", text: TEXT_BODY_LARGE } },
  "Label_text_container_outlined": { type: "FRAME", properties: { layoutSizing: "HUG", padding: [0, 4], layoutPositioning: "ABSOLUTE", top: -12, fill: "M3/sys/light/surface" } },
  "Label_text_container_filled": { type: "FRAME", properties: { layoutSizing: ["FIXED", "HUG"] } },
  "Label_text_small": { type: "TEXT", properties: { constraints: "CENTER LEFT_RIGHT", text: TEXT_BODY_SMALL, layoutSizing: "HUG" } },
  "Label_text_large": { type: "TEXT", properties: { layoutGrow: 1, layoutSizing: ["FILL", "HUG"], text: TEXT_BODY_LARGE } },
  "Input_text_container": { type: "FRAME", properties: { layoutSizing: ["FILL", "HUG"] } },
  "Input_text": { type: "TEXT", properties: { constraints: "CENTER LEFT_RIGHT", fill: COLOR_ON_SURFACE, text: TEXT_BODY_LARGE } },
  "Caret": { type: "VECTOR", properties: { layoutSizing: "FIXED", strokeWeight: 1, width: 0, height: 16 } },
  "disabled-state-color_outlined": { type: "RECTANGLE", properties: { layoutSizing: "FIXED", constraints: "TOP_BOTTOM LEFT_RIGHT", layoutPositioning: "ABSOLUTE", left: 0, top: 0, opacity: 0.03999999910593033, width: 210, height: 56, cornerRadius: 4 } },
  "disabled-state-color_filled": { type: "RECTANGLE", properties: { layoutSizing: "FIXED", constraints: "TOP_BOTTOM LEFT_RIGHT", layoutPositioning: "ABSOLUTE", left: 0, top: 0, fill: COLOR_ON_SURFACE, opacity: 0.03999999910593033, width: 210, height: 56 } },
  "Supporting_text_container": { type: "FRAME", properties: { itemSpacing: 10, layoutSizing: "FIXED", sizingMode: "FIXED", constraints: "BOTTOM LEFT_RIGHT", padding: [4, 16, 0], layoutPositioning: "ABSOLUTE", left: 0, top: 56, width: 210, height: 20 } },
  "supporting-text": { type: "TEXT", properties: { layoutGrow: 1, layoutSizing: ["FILL", "HUG"], constraints: "TOP LEFT_RIGHT", text: TEXT_BODY_SMALL } },
  "Active_indicator": { type: "LINE", properties: { layoutSizing: ["FILL", "FIXED"], constraints: "BOTTOM SCALE", height: 0 } }
}


// =================================================================
// 4. 定义规则查找表 (RULE MAPS)
// =================================================================

// -- Maps for Style: "Outlined" --
DEFINE OUTLINED_STATE_PROPS = {
  "Enabled":  { strokeWeight: 1, stroke: COLOR_OUTLINE },
  "Hovered":  { strokeWeight: 1, stroke: COLOR_ON_SURFACE },
  "Focused":  { strokeWeight: 3, stroke: COLOR_PRIMARY },
  "Disabled": { strokeWeight: 1, stroke: COLOR_DISABLED_STROKE, cornerRadius: 4 },
  "Error":    { strokeWeight: 1, stroke: COLOR_ERROR, strokeAlign: "INSIDE" } // Error focused is thicker
}

// -- Maps for Style: "Filled" --
DEFINE FILLED_STATE_PROPS = {
  "Enabled":  { fill: COLOR_SURFACE_CONTAINER_HIGHEST },
  "Hovered":  { fill: COLOR_SURFACE_CONTAINER_HIGHEST }, // state-layer handles hover fill
  "Focused":  { fill: COLOR_SURFACE_CONTAINER_HIGHEST },
  "Disabled": { opacity: DISABLED_OPACITY },
  "Error":    { fill: COLOR_SURFACE_CONTAINER_HIGHEST }
}

DEFINE FILLED_INDICATOR_PROPS = {
  "Enabled":  { strokeWeight: 1, stroke: COLOR_ON_SURFACE_VARIANT },
  "Hovered":  { strokeWeight: 1, stroke: COLOR_ON_SURFACE },
  "Focused":  { strokeWeight: 3, stroke: COLOR_PRIMARY },
  "Disabled": { strokeWeight: 1, stroke: COLOR_ON_SURFACE, opacity: DISABLED_OPACITY },
  "Error":    { strokeWeight: 1, stroke: COLOR_ERROR } // Error focused is thicker
}

// -- Common Maps for Colors and Properties across styles --
DEFINE TEXT_COLOR_MAP = {
  "Enabled":  COLOR_ON_SURFACE_VARIANT,
  "Hovered":  COLOR_ON_SURFACE,
  "Focused":  COLOR_PRIMARY,
  "Disabled": COLOR_ON_SURFACE,
  "Error":    COLOR_ERROR
}

DEFINE SUPPORTING_TEXT_COLOR_MAP = {
  "Enabled":  COLOR_ON_SURFACE_VARIANT,
  "Hovered":  COLOR_ON_SURFACE_VARIANT,
  "Focused":  COLOR_ON_SURFACE_VARIANT,
  "Disabled": COLOR_ON_SURFACE,
  "Error":    COLOR_ERROR
}

// =================================================================
// 5. 程序化生成逻辑 (GENERATION LOGIC)
// =================================================================

// Initialize the final Component Set structure
CREATE ComponentSet named "Text field" with properties { cornerRadius: 16 }

// Loop through all permutations of variables
FOR EACH style IN STYLES:
  FOR EACH state IN STATES:
    FOR EACH textConfig IN TEXT_CONFIGS:
      FOR EACH hasLeadingIcon IN LEADING_ICON_OPTS:
        FOR EACH hasTrailingIcon IN TRAILING_ICON_OPTS:

          // -- A. Initialize current component variant --
          CREATE Component named `Style=${style}, State=${state}, Text configurations=${textConfig}, Leading icon=${hasLeadingIcon}, Trailing icon=${hasTrailingIcon}`
          Component.properties = { layoutMode: "VERTICAL", layoutSizing: "FIXED", sizingMode: "FIXED", width: 210, height: 56 }

          // -- B. Define common variables for this variant --
          isFocused = (state == "Focused")
          isDisabled = (state == "Disabled")
          isError = (state == "Error")
          isHovered = (state == "Hovered")
          
          // Determine if error state is "focused" (thicker border/indicator)
          isErrorFocused = isError AND (textConfig == "Input text" OR isFocused)

          // -- C. Build the node tree for the component --
          
          // 1. Handle Disabled Overlay
          IF isDisabled:
            IF style == "Outlined":
              ADD child node from TEMPLATES["disabled-state-color_outlined"]
            ELSE: // Filled
              ADD child node from TEMPLATES["disabled-state-color_filled"]
              // Text_field container itself gets opacity
              Component.children[1].properties.opacity = DISABLED_OPACITY 

          // 2. Main Text Field container
          CREATE TextFieldNode from TEMPLATES["Text_field"]
          ADD TextFieldNode to Component.children

          // 3. Apply Style-specific properties to TextFieldNode
          IF style == "Outlined":
            TextFieldNode.properties += OUTLINED_STATE_PROPS[state]
            IF isErrorFocused: TextFieldNode.properties.strokeWeight = 3
            IF state != "Disabled": TextFieldNode.properties.cornerRadius = 4, TextFieldNode.properties.strokeAlign = "INSIDE"
            IF isHovered: Component.properties.stroke = COLOR_ON_SURFACE
          ELSE: // Filled
            TextFieldNode.properties += FILLED_STATE_PROPS[state]
            
          // 4. State Layer
          CREATE StateLayerNode from TEMPLATES["State-layer"]
          ADD StateLayerNode to TextFieldNode.children
          
          // Set padding based on icons
          IF hasLeadingIcon and hasTrailingIcon or isError: StateLayerNode.properties.padding = [4, 0]
          ELSE IF hasLeadingIcon: StateLayerNode.properties.padding = [4, 16, 4, 0]
          ELSE IF hasTrailingIcon: StateLayerNode.properties.padding = [4, 0, 4, 16]
          ELSE: // No icons
             IF style == "Outlined": StateLayerNode.properties.padding = [4, 0, 4, 16]
             ELSE: StateLayerNode.properties.padding = [4, 16] // Filled style has different padding
          
          IF isHovered AND style == "Filled": StateLayerNode.properties.fill = COLOR_HOVER_FILL
          
          // 5. Add Leading Icon if applicable
          IF hasLeadingIcon:
            CREATE LeadingIconNode from TEMPLATES["Leading_icon"]
            IF isDisabled: LeadingIconNode.properties.opacity = DISABLED_OPACITY
            
            CREATE IconContentNode from TEMPLATES["Icon_Content"] with property { component_Icon#756:0 = ICON_ID_SEARCH }
            CREATE IconStateLayerNode from TEMPLATES["Icon_State-layer"]
            CREATE IconSearchNode from TEMPLATES["Icon_search"]
            
            ADD IconSearchNode to IconStateLayerNode.children
            ADD IconStateLayerNode to IconContentNode.children
            ADD IconContentNode to LeadingIconNode.children
            ADD LeadingIconNode to StateLayerNode.children

          // 6. Main Content Area
          CREATE ContentContainerNode from TEMPLATES["Content_container"]
          ADD ContentContainerNode to StateLayerNode.children

          // This is the most complex part - build text area based on config and state
          CALL function BuildTextContent(ContentContainerNode, style, state, textConfig, hasLeadingIcon)
          
          // 7. Add Trailing Icon (Regular or Error)
          trailingIconNode = NULL
          IF isError:
            trailingIconNode = CREATE node from TEMPLATES["trailing-icon-error"]
            trailingIconNode.properties.constraints = "CENTER RIGHT" IF hasTrailingIcon else "CENTER SCALE"
            iconName = "Icon_error"
            iconId = ICON_ID_ERROR
          ELSE IF hasTrailingIcon:
            trailingIconNode = CREATE node from TEMPLATES["Trailing_icon"]
            IF isDisabled: trailingIconNode.properties.opacity = DISABLED_OPACITY
            iconName = "Icon_cancel"
            iconId = ICON_ID_CANCEL

          IF trailingIconNode != NULL:
            CREATE IconContentNode from TEMPLATES["Icon_Content"] with property { component_Icon#756:0 = iconId }
            CREATE IconStateLayerNode from TEMPLATES["Icon_State-layer"]
            CREATE IconNode from TEMPLATES[iconName]
            
            ADD IconNode to IconStateLayerNode.children
            ADD IconStateLayerNode to IconContentNode.children
            ADD IconContentNode to trailingIconNode.children
            ADD trailingIconNode to StateLayerNode.children

          // 8. Add Active Indicator for Filled style
          IF style == "Filled":
            CREATE IndicatorNode from TEMPLATES["Active_indicator"]
            IndicatorNode.properties += FILLED_INDICATOR_PROPS[state]
            IF isErrorFocused: IndicatorNode.properties.strokeWeight = 3
            ADD IndicatorNode to Component.children

          // 9. Add Supporting Text
          CREATE SupportingTextContainerNode from TEMPLATES["Supporting_text_container"]
          IF isDisabled: SupportingTextContainerNode.properties.opacity = DISABLED_OPACITY
          
          CREATE SupportingTextNode from TEMPLATES["supporting-text"]
          SupportingTextNode.properties.fill = SUPPORTING_TEXT_COLOR_MAP[state]
          
          ADD SupportingTextNode to SupportingTextContainerNode.children
          ADD SupportingTextContainerNode to Component.children

ENDFOR; ENDFOR; ENDFOR; ENDFOR; ENDFOR;


// =================================================================
// 6. HELPER FUNCTION for building the complex text content
// =================================================================

FUNCTION BuildTextContent(parent, style, state, textConfig, hasLeadingIcon):
  isFocused = (state == "Focused")
  isDisabled = (state == "Disabled")
  isError = (state == "Error")
  
  // -- Label Text --
  hasFloatedLabel = (textConfig == "Input text" OR isFocused)
  
  IF style == "Outlined":
    labelContainerTemplate = "Label_text_container_outlined"
    labelContainerNode = CREATE node from TEMPLATES[labelContainerTemplate]
    labelContainerNode.properties.left = -36 if hasLeadingIcon else -4
  ELSE: // Filled
    labelContainerTemplate = "Label_text_container_filled"
    labelContainerNode = CREATE node from TEMPLATES[labelContainerTemplate]
    
  IF hasFloatedLabel:
    labelTextNode = CREATE node from TEMPLATES["Label_text_small"]
    labelTextNode.properties.fill = TEXT_COLOR_MAP[state]
    IF isDisabled: labelTextNode.properties.opacity = DISABLED_OPACITY
    IF style == "Filled": labelContainerNode.properties.width = 31 // Small label has smaller container
  ELSE: // Not floated (placeholder or just label text)
    IF textConfig == "Label text":
      labelTextNode = CREATE node from TEMPLATES["Label_text_large"]
      IF style == "Filled": labelContainerNode.properties.width = 41
    ELSE: // Placeholder text
      labelTextNode = CREATE node from TEMPLATES["Label_text_small"]
      IF style == "Filled": labelContainerNode.properties.width = 31
      
    labelTextNode.properties.fill = TEXT_COLOR_MAP[state]
    IF isDisabled: labelTextNode.properties.opacity = DISABLED_OPACITY

  ADD labelTextNode to labelContainerNode.children
  
  // -- Input/Placeholder Area --
  IF textConfig == "Placeholder text":
    placeholderContainerNode = CREATE node from TEMPLATES["Placeholder_text_container"]
    IF style == "Outlined": placeholderContainerNode.properties.itemSpacing = 10
    
    IF isFocused:
      caretNode = CREATE node from TEMPLATES["Caret"]
      caretNode.properties.stroke = TEXT_COLOR_MAP[state]
      ADD caretNode to placeholderContainerNode.children
    
    placeholderTextNode = CREATE node from TEMPLATES["Placeholder_text"]
    placeholderTextNode.properties.fill = TEXT_COLOR_MAP[state]
    IF isDisabled: placeholderTextNode.properties.opacity = DISABLED_OPACITY
    ADD placeholderTextNode to placeholderContainerNode.children
    
    ADD placeholderContainerNode to parent.children
    // Floated label is added for placeholder text
    ADD labelContainerNode to parent.children

  ELSE IF textConfig == "Input text":
    inputContainerNode = CREATE node from TEMPLATES["Input_text_container"]
    inputTextNode = CREATE node from TEMPLATES["Input_text"]
    IF isDisabled: 
        inputTextNode.properties.opacity = DISABLED_OPACITY
    ELSE:
        inputTextNode.properties.fill = COLOR_ON_SURFACE
        
    ADD inputTextNode to inputContainerNode.children
    
    IF isFocused OR (isError AND state != "Disabled"):
      caretNode = CREATE node from TEMPLATES["Caret"]
      caretNode.properties.stroke = TEXT_COLOR_MAP[state]
      caretNode.properties.constraints = "CENTER LEFT"
      ADD caretNode to inputContainerNode.children

    ADD inputContainerNode to parent.children
    ADD labelContainerNode to parent.children
    
  ELSE: // Label text
    // The label IS the content
    ADD labelContainerNode to parent.children

ENDFUNCTION