# Figma 数据压缩脚本指南

## 核心目标

将原始、冗长的 Figma JSON 数据，通过一系列语义压缩规则，转换为一个结构清晰、信息密度高、人类可读的 **YAML** 文件。

## 核心原则

1.  **语义压缩**: 不仅仅是减少字符，更是通过省略默认值、合并相关属性等方式，消除数据噪音，只保留设计决策的关键信息。
2.  **标准格式**: 采用通用的 YAML 格式进行输出，以利用其丰富的生态系统（解析器、编辑器高亮、格式化工具等），降低集成和维护成本。
3.  **可读性优先**: 最终的 YAML 文件应直观易懂，即使对于不完全了解 Figma 复杂数据结构的人员也能快速理解。

---

## 宏观结构 (YAML Format)

输出的 YAML 是一个节点列表。每个节点都是一个对象，包含 `name`, `type`, `properties` 和一个可选的 `children` 列表，形成一个递归的树状结构。

```yaml
- name: NodeName # 节点的名称
  type: NodeType # 节点的类型 (FRAME, INSTANCE, TEXT 等)
  properties: # 经过压缩和处理后的属性
    key1: value1
    key2: value2
  children: # 子节点列表，结构与父级相同
    - name: FirstChildNode
      type: ...
      properties: {...}
    - name: SecondChildNode
      type: ...
      properties: {...}
```

---

## 属性处理与压缩规则 (通用)

这是脚本的核心逻辑。所有属性都应放在输出 YAML 的 `properties` 键下。

### 基本规则：省略默认值

如果一个属性的值是 Figma 的默认值，则**必须省略**该属性，不写入 YAML 文件。

### 1. 布局属性 (Layout Properties)

| 属性 | 默认值 | 备注 |
| :--- | :--- | :--- |
| `layoutMode` | `NONE` (在AutoLayout中为`HORIZONTAL`) | 在非AutoLayout Frame中，通常无此属性或为`NONE` |
| `layoutWrap` | `NO_WRAP` | |
| `layoutGrow` | `0` | |
| `itemSpacing` | `0` | |
| `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` | `0` | 见下方合并规则 |
| `constraints` | `{ "vertical": "TOP", "horizontal": "LEFT" }` | 见下方合并规则 |

### 2. 可合并属性 (Mergeable Properties)

为了极致简洁，将多个相关属性合并为一个。

| 原始 Figma 属性 (多个) | 合并后 YAML 属性 (一个) | 合并规则 | 示例 |
| :--- | :--- | :--- | :--- |
| `layoutSizingHorizontal`, `layoutSizingVertical` | `layoutSizing` | 如果两者值相同，合并为一个值。否则，使用 `[horizontal, vertical]` 数组。 | `"HUG", "HUG"` -> `"HUG"`<br/>`"FIXED", "HUG"` -> `["FIXED", "HUG"]` |
| `primaryAxisSizingMode`, `counterAxisSizingMode` | `sizingMode` | 同上 | `"AUTO", "AUTO"` -> `"AUTO"` |
| `primaryAxisAlignItems`, `counterAxisAlignItems` | `alignItems` | 同上 | `"CENTER", "CENTER"` -> `"CENTER"`<br/>`"SPACE_BETWEEN", "MIN"` -> `["SPACE_BETWEEN", "MIN"]` |
| `constraints.horizontal`, `constraints.vertical` | `constraints` | 合并为 `"VERTICAL HORIZONTAL"` 字符串。 | `"TOP", "LEFT"` -> `"TOP LEFT"`<br/>`"CENTER", "SCALE"` -> `"CENTER SCALE"` |
| `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` | `padding` | 遵循 CSS `padding` 的简写规则（1到4个值）。 | `10, 10, 10, 10` -> `10`<br/>`10, 20, 10, 20` -> `[10, 20]`<br/>`10, 20, 30, 40` -> `[10, 20, 30, 40]` |

### 3. 样式属性 (Style Properties)

| 属性 | 默认值 | 备注 |
| :--- | :--- | :--- |
| `cornerRadius` | `0` | |
| `opacity` | `1` | |
| `strokeWeight` | `0` | styles.stroke无值时，不输出 |
| `strokeAlign` | `CENTER` | styles.stroke无值时，不输出 |
| `styles` | (无) | 见下方特殊规则 |

#### `styles` 属性处理

`styles` 对象中的值是 `styleKey`。脚本需要根据 `styleKey` 从原始 JSON 的 `nodes.[nodeKey].styles` 中查找对应的 `name`。

**限定处理的样式类型**: `fill`, `stroke`, `text`

**转换示例**:
*   *原始 JSON*: `"styles": { "fill": "12:34" }`
*   *数据源*: `styles["12:34"].name` 是 `"Brand/Primary"`
*   *输出 YAML*:
    ```yaml
    properties:
      fill: "Brand/Primary"
    ```

### 4. 尺寸属性 (Width & Height)

`width` 和 `height` 属性（从 `absoluteBoundingBox` 获取）的处理具有严格的前置条件：

*   仅当节点的 `layoutSizingHorizontal` 为 `FIXED` 时，才记录 `width`。
*   仅当节点的 `layoutSizingVertical` 为 `FIXED` 时，才记录 `height`。

如果一个节点是 `FIXED` 宽度和 `HUG` 高度，则最终的 YAML 中只应出现 `width` 属性。

```yaml
# 示例: 300x200 的固定尺寸矩形
properties:
  layoutSizing: FIXED # "FIXED", "FIXED" 合并而来
  width: 300
  height: 200

# 示例: 宽度固定，高度自适应的容器
properties:
  layoutSizing: ["FIXED", "HUG"]
  width: 500
  # height 属性被省略
```

# Figma 数据转换器

这个工具可以将 Figma API 返回的 JSON 数据转换为结构化的 YAML 格式，便于后续处理和分析。

## 功能特性

- 提取 Figma 节点的布局、样式和尺寸属性
- 智能属性合并（如 padding、layoutSizing 等）
- 过滤默认值，只保留有意义的属性
- 支持样式引用解析
- **新增：中间件系统支持自定义数据处理**

## 中间件系统

转换器现在支持中间件系统，允许你在数据处理的不同阶段插入自定义逻辑。

### 中间件接口

```typescript
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
```

### 使用示例

```typescript
import { FigmaDataConverter, Middleware } from './figma-data.js';

// 创建自定义中间件
const customMiddleware: Middleware = {
  name: 'customProcessor',
  
  afterExtractProperties(node, properties, context) {
    // 为组件添加特殊标记
    if (node.type === 'COMPONENT') {
      properties.isComponent = true;
    }
    
    // 添加节点路径信息
    properties.nodePath = context.currentPath.join(' > ');
    
    return properties;
  },
  
  beforeProcessNode(node, context) {
    // 清理节点名称
    const cleanedNode = { ...node };
    cleanedNode.name = node.name.replace(/[^\w\s-]/g, '').trim();
    return cleanedNode;
  }
};

// 使用中间件
const converter = new FigmaDataConverter(figmaData);
converter.use(customMiddleware);

const result = await converter.convert();
```

### 中间件管理方法

```typescript
// 添加中间件
converter.use(middleware);

// 移除中间件
converter.removeMiddleware('middlewareName');

// 获取所有中间件
const middlewares = converter.getMiddlewares();

// 清空所有中间件
converter.clearMiddlewares();

// 链式调用
converter
  .use(middleware1)
  .use(middleware2)
  .use(middleware3);
```

### 中间件上下文

每个中间件函数都会收到一个上下文对象：

```typescript
interface MiddlewareContext {
  converter: FigmaDataConverter;  // 转换器实例
  styles: Record<string, { name: string }>;  // 样式映射
  currentPath: string[];  // 当前节点路径
}
```

### 中间件执行顺序

中间件按照添加顺序执行：

1. `beforeConvert` - 所有中间件的此钩子按顺序执行
2. 对每个节点：
   - `beforeProcessNode` - 按顺序执行
   - `afterExtractProperties` - 按顺序执行  
   - `afterProcessYamlNode` - 按顺序执行
3. `afterConvert` - 所有中间件的此钩子按顺序执行

## 基本使用

```bash
# 直接运行
tsx figma-data.ts <figma-json-file>

# 或者使用 Node.js
node figma-data.js <figma-json-file>
```

## 编程使用

```typescript
import { FigmaDataConverter } from './figma-data.js';
import * as fs from 'fs';

const jsonContent = fs.readFileSync('figma.json', 'utf-8');
const figmaData = JSON.parse(jsonContent);

const converter = new FigmaDataConverter(figmaData);
const yamlResult = await converter.convert();

fs.writeFileSync('output.yml', yamlResult, 'utf-8');
```

## 支持的属性

### 布局属性
- `layoutMode` - 布局模式（AUTO, NONE等）
- `layoutWrap` - 布局换行
- `layoutGrow` - 布局增长
- `itemSpacing` - 项目间距
- `layoutSizing` - 布局尺寸模式
- `sizingMode` - 主轴/交叉轴尺寸模式
- `alignItems` - 对齐方式
- `constraints` - 约束
- `padding` - 内边距（智能合并）

### 样式属性
- `cornerRadius` - 圆角半径
- `opacity` - 透明度
- `strokeWeight` - 描边宽度
- `strokeAlign` - 描边对齐
- `fill` - 填充样式引用
- `stroke` - 描边样式引用
- `text` - 文本样式引用

### 尺寸属性
- `width` - 宽度（仅当 layoutSizing 为 FIXED 时）
- `height` - 高度（仅当 layoutSizing 为 FIXED 时）

## 输出格式

生成的 YAML 格式如下：

```yaml
- name: "ComponentName"
  type: COMPONENT
  properties:
    layoutMode: VERTICAL
    itemSpacing: 16
    padding: [12, 16]
    cornerRadius: 8
    fill: "Primary/500"
  children:
    - name: "ChildNode"
      type: FRAME
      properties:
        layoutSizing: FILL
```