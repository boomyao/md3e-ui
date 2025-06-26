# 去重中间件逻辑

## 概述
去重中间件用于识别和提取相似的组件，避免重复代码生成。

## 核心逻辑伪代码

### 主要处理流程
```
FUNCTION afterConvert(yamlNodes):
    // 1. 数据准备
    nodeLocationsByTypeAndName = 空Map
    newRoots = 深拷贝(yamlNodes)
    extractedComponents = 空数组
    usedComponentNames = 空Set
    
    // 2. 收集节点位置信息
    FUNCTION traverse(nodes, parent):
        FOR each node in nodes:
            IF node.ref exists:
                continue  // 跳过已优化的节点
            
            key = node.type + ":" + node.name
            将 {parent, index, node} 添加到 nodeLocationsByTypeAndName[key]
            
            IF node.children exists:
                traverse(node.children, node)
    
    traverse(newRoots, null)
    
    // 3. 节点聚类和去重
    FOR each locationGroup in nodeLocationsByTypeAndName:
        IF locationGroup.length < 2:
            continue  // 少于2个节点不需要去重
        
        visited = 全false数组(locationGroup.length)
        
        FOR i = 0 to locationGroup.length:
            IF visited[i]:
                continue
            
            visited[i] = true
            cluster = [locationGroup[i]]
            propsA = separateProperties(locationGroup[i].node.properties).shared
            
            // 查找相似节点
            FOR j = i+1 to locationGroup.length:
                IF visited[j]:
                    continue
                
                propsB = separateProperties(locationGroup[j].node.properties).shared
                similarity = calculateSimilarity(propsA, propsB)
                
                IF similarity >= SIMILARITY_THRESHOLD:
                    visited[j] = true
                    cluster.add(locationGroup[j])
            
            // 处理相似节点集群
            IF cluster.length > 1:
                extractSharedComponent(cluster, extractedComponents, usedComponentNames)
                replaceWithReferences(cluster)
    
    return newRoots + extractedComponents
```

### 辅助函数逻辑

#### 属性分离
```
FUNCTION separateProperties(properties):
    shared = 空对象
    instance = 空对象
    
    FOR each key in properties:
        IF key in NODE_SPECIFIC_PROPS:
            instance[key] = properties[key]
        ELSE:
            shared[key] = properties[key]
    
    return {shared, instance}
```

#### 相似度计算
```
FUNCTION calculateSimilarity(propsA, propsB):
    allKeys = propsA的所有key + propsB的所有key (去重)
    
    IF allKeys为空:
        return 1.0
    
    commonCount = 0
    FOR each key in allKeys:
        IF key存在于propsA AND key存在于propsB AND deepCompareWithTolerance(propsA[key], propsB[key]):
            commonCount++
    
    return commonCount / allKeys.size
```

#### 深度比较（带容差）
```
FUNCTION deepCompareWithTolerance(a, b):
    IF 都是数字:
        return |a - b| <= 0.001
    
    IF 都是对象:
        IF 都是数组:
            IF 长度不同: return false
            return 每个元素都相等
        
        IF 都是普通对象:
            IF key数量不同: return false
            return 每个key的值都相等
    
    ELSE:
        return JSON.stringify(a) === JSON.stringify(b)
```

#### 提取共享组件
```
FUNCTION extractSharedComponent(cluster, extractedComponents, usedComponentNames):
    representativeNode = cluster[0].node
    allProps = cluster中所有节点的shared属性
    
    // 分析属性
    commonProps = 空对象
    variablePropKeys = 空Set
    
    allKeys = 所有属性的key集合
    FOR each key in allKeys:
        firstValue = allProps[0][key]
        isCommon = 所有props都有这个key且值相等
        
        IF isCommon:
            commonProps[key] = firstValue
        ELSE:
            variablePropKeys.add(key)
    
    // 生成组件名
    name = 如果父节点不是COMPONENT则为 "父节点名->节点名" 否则为 "节点名"
    newComponentName = generateUniqueComponentName(name, usedComponentNames)
    
    // 创建共享组件
    newSharedComponent = {
        name: newComponentName,
        type: representativeNode.type,
        properties: commonProps,
        variables: Array.from(variablePropKeys),
        children: representativeNode.children
    }
    
    extractedComponents.add(newSharedComponent)
```

#### 替换为引用节点
```
FUNCTION replaceWithReferences(cluster):
    FOR each location in cluster:
        instanceProps = separateProperties(location.node.properties).instance
        sharedProps = separateProperties(location.node.properties).shared
        
        boundVariables = 空对象
        FOR each key in variablePropKeys:
            IF key存在于sharedProps:
                boundVariables[key] = sharedProps[key]
        
        referenceNode = {
            name: location.node.name,
            type: location.node.type,
            ref: newComponentName,
            properties: instanceProps,
            boundVariables: boundVariables,
            children: location.node.children || []
        }
        
        // 替换原节点
        IF location.parent存在:
            location.parent.children[location.index] = referenceNode
        ELSE:
            newRoots[location.index] = referenceNode
```

## 常量定义
- `SIMILARITY_THRESHOLD = 0.5` - 相似度阈值
- `NODE_SPECIFIC_PROPS = Set()` - 节点特定属性集合（当前为空）

## 数据结构
- `NodeLocation`: 包含 parent, index, node 的节点位置信息
- `YamlNode`: 包含 name, type, properties, children 等的节点结构
