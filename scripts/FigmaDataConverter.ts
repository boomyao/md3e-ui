// 类型定义
interface ConstraintsType {
  horizontal?: string;
  vertical?: string;
}

interface AbsoluteBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  
  // 可见性属性
  visible?: boolean;
  
  // 组件属性
  componentId?: string;
  componentProperties?: Record<string, {
    type: string;
    value?: unknown;
    preferredValues?: unknown[];
  }>;
  
  // 布局属性
  layoutMode?: string;
  layoutWrap?: string;
  layoutGrow?: number;
  itemSpacing?: number;
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  layoutPositioning?: string;
  primaryAxisSizingMode?: string;
  counterAxisSizingMode?: string;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  constraints?: ConstraintsType;
  
  // 内边距属性
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  
  // 样式属性
  cornerRadius?: number;
  opacity?: number;
  strokeWeight?: number;
  strokeAlign?: string;
  styles?: Record<string, string>;
  
  // 尺寸属性
  absoluteBoundingBox?: AbsoluteBoundingBox;
  
  [key: string]: unknown;
}

interface RootNode {
  document: FigmaNode;
  components?: Record<string, FigmaNode>;
  styles?: Record<string, { name: string }>;
}

export interface FigmaData {
  nodes: {
    [key: string]: RootNode;
  };
}

// 支持的属性值类型
export type PropertyValue = string | number | boolean | string[] | number[];

// YAML 输出节点结构
export interface YamlNode {
  name: string;
  type: string;
  ref?: string;
  properties?: Record<string, PropertyValue>;
  children?: YamlNode[];
  variables?: string[];
  boundVariables?: Record<string, PropertyValue>;
}

// 中间件上下文接口
interface MiddlewareContext {
  converter: FigmaDataConverter;
  styles: Record<string, { name: string }>;
  currentPath: FigmaNode[];
  currentParent?: FigmaNode;
}

// 中间件接口
interface Middleware {
  name: string;
  
  // 在开始转换前调用
  beforeConvert?(data: FigmaData, context: MiddlewareContext): Promise<FigmaData> | FigmaData;
  
  // 在处理节点前调用
  beforeProcessNode?(node: FigmaNode, context: MiddlewareContext): Promise<FigmaNode> | FigmaNode;
  
  // 在提取属性后调用
  afterExtractProperties?(node: FigmaNode, properties: Record<string, PropertyValue>, context: MiddlewareContext): Promise<Record<string, PropertyValue>> | Record<string, PropertyValue>;
  
  // 在处理完 YAML 节点后调用
  afterProcessYamlNode?(yamlNode: YamlNode, originalNode: FigmaNode, context: MiddlewareContext): Promise<YamlNode> | YamlNode;
  
  // 在转换完成后调用
  afterConvert?(yamlNodes: YamlNode[], context: MiddlewareContext): Promise<YamlNode[]> | YamlNode[];
}

class FigmaDataConverter {
  private styles: Record<string, { name: string }> = {};
  private middlewares: Middleware[] = [];
  private currentPath: FigmaNode[] = [];

  constructor(private data: FigmaData) {
    // 收集所有样式定义
    Object.entries(data.nodes).forEach(([, nodeData]) => {
      if (nodeData.styles) {
        Object.assign(this.styles, nodeData.styles);
      }
    });
  }

  // 中间件管理方法
  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  removeMiddleware(name: string): this {
    this.middlewares = this.middlewares.filter(m => m.name !== name);
    return this;
  }

  getMiddlewares(): Middleware[] {
    return [...this.middlewares];
  }

  clearMiddlewares(): this {
    this.middlewares = [];
    return this;
  }

  async convert(): Promise<string> {
    let processedData = this.data;
    const context = this.createContext();

    // 执行 beforeConvert 中间件
    for (const middleware of this.middlewares) {
      if (middleware.beforeConvert) {
        processedData = await middleware.beforeConvert(processedData, context);
      }
    }

    const yamlNodes: YamlNode[] = [];

    // 处理每个根节点
    for (const [, nodeData] of Object.entries(processedData.nodes)) {
      const convertedNode = await this.processNode(nodeData.document);
      if (convertedNode) {
        yamlNodes.push(convertedNode);
      }
    }

    // 执行 afterConvert 中间件
    let finalNodes = yamlNodes;
    for (const middleware of this.middlewares) {
      if (middleware.afterConvert) {
        finalNodes = await middleware.afterConvert(finalNodes, context);
      }
    }

    return this.yamlNodesToString(finalNodes);
  }

  private createContext(): MiddlewareContext {
    return {
      converter: this,
      styles: this.styles,
      currentPath: [...this.currentPath],
      currentParent: this.currentPath[this.currentPath.length - 2] // 倒数第二个就是父节点
    };
  }

  private async processNode(node: FigmaNode): Promise<YamlNode | null> {
    if (!node) return null;

    // 检查节点可见性，如果 visible 为 false 则忽略该节点
    if (node.visible === false) {
      return null;
    }

    // 更新当前路径
    this.currentPath.push(node);
    let processedNode = node;
    const context = this.createContext();

    // 特殊处理：检查是否为 Icon 组件 (INSTANCE with VECTOR child)
    if (processedNode.type === 'INSTANCE' && 
        processedNode.children && 
        processedNode.children.length > 0 && 
        processedNode.children[0].type === 'VECTOR') {
      
      const componentId = processedNode.componentId as string;
      if (componentId) {
        // 从 components map 中查找对应的组件
        let componentName: string | null = null;
        for (const [, nodeData] of Object.entries(this.data.nodes)) {
          if (nodeData.components && nodeData.components[componentId]) {
            componentName = nodeData.components[componentId].name;
            break;
          }
        }
        
        if (componentName) {
          // 创建新的处理节点，设置为 ICON 类型
          processedNode = {
            ...processedNode,
            name: componentName,
            type: 'ICON',
            children: undefined // 忽略子节点
          };
        }
      }
    }

    // 执行 beforeProcessNode 中间件
    for (const middleware of this.middlewares) {
      if (middleware.beforeProcessNode) {
        processedNode = await middleware.beforeProcessNode(processedNode, context);
      }
    }

    const yamlNode: YamlNode = {
      name: processedNode.name,
      type: processedNode.type
    };

    // 提取属性
    let properties = this.extractProperties(processedNode, context);

    // 执行 afterExtractProperties 中间件
    for (const middleware of this.middlewares) {
      if (middleware.afterExtractProperties) {
        properties = await middleware.afterExtractProperties(processedNode, properties, context);
      }
    }

    if (Object.keys(properties).length > 0) {
      yamlNode.properties = properties;
    }

    // 处理子节点
    if (processedNode.children && processedNode.children.length > 0) {
      const children: YamlNode[] = [];
      for (const child of processedNode.children) {
        const convertedChild = await this.processNode(child);
        if (convertedChild) {
          children.push(convertedChild);
        }
      }
      if (children.length > 0) {
        yamlNode.children = children;
      }
    }

    // 执行 afterProcessYamlNode 中间件
    let finalYamlNode = yamlNode;
    for (const middleware of this.middlewares) {
      if (middleware.afterProcessYamlNode) {
        finalYamlNode = await middleware.afterProcessYamlNode(finalYamlNode, processedNode, context);
      }
    }

    // 恢复路径
    this.currentPath.pop();

    return finalYamlNode;
  }

  private extractProperties(node: FigmaNode, context: MiddlewareContext): Record<string, PropertyValue> {
    const properties: Record<string, PropertyValue> = {};

    // 处理组件属性（INSTANCE 节点）
    this.addComponentProperties(node, properties);
    
    // 处理布局属性
    this.addLayoutProperties(node, properties);
    
    // 处理绝对定位属性
    this.addAbsolutePositionProperties(node, properties, context);
    
    // 处理样式属性
    this.addStyleProperties(node, properties);
    
    // 处理尺寸属性
    this.addSizeProperties(node, properties);

    return properties;
  }

  private addComponentProperties(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    // 只处理 INSTANCE 类型的节点
    if (node.type === 'INSTANCE' && node.componentProperties) {
      Object.entries(node.componentProperties).forEach(([propName, propData]) => {
        if (propData.value !== undefined) {
          // 将组件属性添加到 properties 中，使用 component_ 前缀避免冲突
          const key = `component_${propName}`;
          
          // 根据属性类型处理值
          switch (propData.type) {
            case 'TEXT':
            case 'VARIANT':
              properties[key] = String(propData.value);
              break;
            case 'BOOLEAN':
              properties[key] = Boolean(propData.value);
              break;
            case 'INSTANCE_SWAP':
              // 对于实例交换，记录组件 ID 或名称
              properties[key] = String(propData.value);
              break;
            default:
              // 其他类型直接转为字符串
              properties[key] = String(propData.value);
          }
        }
      });
    }
  }

  private addLayoutProperties(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    // layoutMode - 默认值为 NONE，在 AutoLayout 中为 HORIZONTAL
    if (node.layoutMode && node.layoutMode !== 'NONE' && node.layoutMode !== 'HORIZONTAL') {
      properties.layoutMode = node.layoutMode;
    }

    // layoutWrap - 默认值为 NO_WRAP
    if (node.layoutWrap && node.layoutWrap !== 'NO_WRAP') {
      properties.layoutWrap = node.layoutWrap;
    }

    // layoutGrow - 默认值为 0
    if (node.layoutGrow && node.layoutGrow !== 0) {
      properties.layoutGrow = node.layoutGrow;
    }

    // itemSpacing - 默认值为 0
    if (node.itemSpacing && node.itemSpacing !== 0) {
      properties.itemSpacing = node.itemSpacing;
    }

    // layoutSizing 合并属性
    this.addLayoutSizing(node, properties);

    // sizingMode 合并属性
    this.addSizingMode(node, properties);

    // alignItems 合并属性
    this.addAlignItems(node, properties);

    // constraints 合并属性
    this.addConstraints(node, properties);

    // padding 合并属性
    this.addPadding(node, properties);
  }

  private addLayoutSizing(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    const horizontal = node.layoutSizingHorizontal;
    const vertical = node.layoutSizingVertical;

    if (horizontal && vertical) {
      if (horizontal === vertical) {
        properties.layoutSizing = horizontal;
      } else {
        properties.layoutSizing = [horizontal, vertical];
      }
    }
  }

  private addSizingMode(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    const primary = node.primaryAxisSizingMode;
    const counter = node.counterAxisSizingMode;

    if (primary && counter) {
      if (primary === counter) {
        properties.sizingMode = primary;
      } else {
        properties.sizingMode = [primary, counter];
      }
    }
  }

  private addAlignItems(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    const primary = node.primaryAxisAlignItems;
    const counter = node.counterAxisAlignItems;

    if (primary && counter) {
      if (primary === counter) {
        properties.alignItems = primary;
      } else {
        properties.alignItems = [primary, counter];
      }
    }
  }

  private addConstraints(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    if (node.constraints) {
      const horizontal = node.constraints.horizontal || 'LEFT';
      const vertical = node.constraints.vertical || 'TOP';
      
      // 只有当不是默认值时才添加
      if (horizontal !== 'LEFT' || vertical !== 'TOP') {
        properties.constraints = `${vertical} ${horizontal}`;
      }
    }
  }

  private addPadding(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    const top = node.paddingTop || 0;
    const right = node.paddingRight || 0;
    const bottom = node.paddingBottom || 0;
    const left = node.paddingLeft || 0;

    // 只有当存在非零内边距时才添加
    if (top || right || bottom || left) {
      const paddingValue = this.formatPaddingValue(top, right, bottom, left);
      properties.padding = paddingValue;
    }
  }

  private addAbsolutePositionProperties(node: FigmaNode, properties: Record<string, PropertyValue>, context: MiddlewareContext): void {
    // 只有当 layoutPositioning 为 'ABSOLUTE' 时才计算位置
    if (node.layoutPositioning !== 'ABSOLUTE') {
      return;
    }

    // 获取父节点
    const parentNode = context.currentParent;

    // 检查节点和父节点是否都有 absoluteBoundingBox
    if (!node.absoluteBoundingBox || !parentNode?.absoluteBoundingBox) {
      return;
    }

    // 计算相对于父节点的位置
    const left = node.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x;
    const top = node.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y;

    // 添加位置属性
    properties.layoutPositioning = 'ABSOLUTE';
    properties.left = left;
    properties.top = top;
  }

  private formatPaddingValue(top: number, right: number, bottom: number, left: number): number | number[] {
    // 遵循 CSS padding 简写规则
    if (top === right && right === bottom && bottom === left) {
      // 四个值都相同
      return top;
    } else if (top === bottom && left === right) {
      // 上下相同，左右相同
      return [top, right];
    } else if (left === right) {
      // 左右相同
      return [top, right, bottom];
    } else {
      // 四个值都不同
      return [top, right, bottom, left];
    }
  }

  private addStyleProperties(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    // cornerRadius - 默认值为 0
    if (node.cornerRadius && node.cornerRadius !== 0) {
      properties.cornerRadius = node.cornerRadius;
    }

    // opacity - 默认值为 1
    if (node.opacity && node.opacity !== 1) {
      properties.opacity = node.opacity;
    }

    // strokeWeight - 默认值为 0，但只有在有 stroke 样式时才处理
    if (node.styles?.stroke && node.strokeWeight && node.strokeWeight !== 0) {
      properties.strokeWeight = node.strokeWeight;
    }

    // strokeAlign - 默认值为 CENTER，但只有在有 stroke 样式时才处理
    if (node.styles?.stroke && node.strokeAlign && node.strokeAlign !== 'CENTER') {
      properties.strokeAlign = node.strokeAlign;
    }

    // styles 属性处理 - 限定处理的样式类型: fill, stroke, text
    if (node.styles) {
      const limitedStyleTypes = ['fill', 'stroke', 'text'];
      Object.entries(node.styles).forEach(([styleType, styleKey]) => {
        if (limitedStyleTypes.includes(styleType)) {
          const styleName = this.styles[styleKey];
          if (styleName?.name) {
            properties[styleType] = styleName.name;
          }
        }
      });
    }
  }

  private addSizeProperties(node: FigmaNode, properties: Record<string, PropertyValue>): void {
    // 只有当 layoutSizing 为 FIXED 时才记录 width/height
    const hasFixedWidth = node.layoutSizingHorizontal === 'FIXED';
    const hasFixedHeight = node.layoutSizingVertical === 'FIXED';

    if (node.absoluteBoundingBox) {
      if (hasFixedWidth && node.absoluteBoundingBox.width !== undefined) {
        properties.width = node.absoluteBoundingBox.width;
      }

      if (hasFixedHeight && node.absoluteBoundingBox.height !== undefined) {
        properties.height = node.absoluteBoundingBox.height;
      }
    }
  }

  private yamlNodesToString(nodes: YamlNode[], indent: number = 0): string {
    const lines: string[] = [];
    const indentStr = '  '.repeat(indent);

    for (const node of nodes) {
      if (node.ref) {
        lines.push(`${indentStr}- ref:"${node.ref}"`);
      } else {
        lines.push(`${indentStr}- name: "${node.name}"`);
        lines.push(`${indentStr}  type: ${node.type}`);
      }

      // 属性
      if (node.properties && Object.keys(node.properties).length > 0) {
        lines.push(`${indentStr}  properties:`);
        Object.entries(node.properties).forEach(([key, value]) => {
          const formattedValue = this.formatYamlValue(value);
          lines.push(`${indentStr}    ${key}: ${formattedValue}`);
        });
      }

      if (node.variables && node.variables.length > 0) {
        lines.push(`${indentStr}  variables: ${node.variables.join(', ')}`);
      }
      if (node.boundVariables && Object.keys(node.boundVariables).length > 0) {
        Object.entries(node.boundVariables).forEach(([key, value]) => {
          const formattedValue = this.formatYamlValue(value);
          lines.push(`${indentStr}    ${key}: ${formattedValue}`);
        });
      }

      // 子节点
      if (node.children && node.children.length > 0) {
        lines.push(`${indentStr}  children:`);
        const childrenYaml = this.yamlNodesToString(node.children, indent + 2);
        lines.push(childrenYaml);
      }
    }

    return lines.join('\n');
  }

  private formatYamlValue(value: PropertyValue): string {
    if (typeof value === 'string') {
      // 如果字符串包含特殊字符，使用引号
      if (value.includes(' ') || value.includes('/') || value.includes('-')) {
        return `"${value}"`;
      }
      return value;
    } else if (Array.isArray(value)) {
      return `[${value.map(v => this.formatYamlValue(v)).join(', ')}]`;
    } else {
      return String(value);
    }
  }
}

export { FigmaDataConverter, type Middleware, type MiddlewareContext };
