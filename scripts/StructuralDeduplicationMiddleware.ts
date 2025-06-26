/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Middleware, type YamlNode, type PropertyValue } from './FigmaDataConverter';

// --- Type Definitions ---
interface ReplacementInfo {
  ref: string;
  boundVariables?: Record<string, PropertyValue>;
  children?: YamlNode[];
}

/**
 * A middleware for deduplicating structurally similar nodes in the YAML data.
 *
 * This middleware iteratively scans the node tree to find groups of similar nodes.
 * For each group, it creates a reusable "definition" node. The original nodes are then
 * replaced with references (`ref`) to this definition, along with any differing
 * properties as `boundVariables`.
 *
 * The process repeats until no more deduplication opportunities are found in a pass.
 */
export class StructuralDeduplicationMiddleware implements Middleware {
  readonly name = 'StructuralDeduplicationMiddleware';

  // --- Constants ---
  private static readonly SIMILARITY_THRESHOLD = 0.5;
  private static readonly CHILDREN_SIMILARITY_THRESHOLD = 0.5;

  private usedNames = new Set<string>();

  async afterConvert(initialYamlNodes: YamlNode[]): Promise<YamlNode[]> {
    const definitions = new Map<string, YamlNode>();
    let definitionsWereAddedInLastPass: boolean;

    do {
      definitionsWereAddedInLastPass = false;
      const allNodes = this._collectAllProcessableNodes(initialYamlNodes);
      const similarNodeGroups = this._findSimilarNodeGroups(allNodes);

      if (similarNodeGroups.length > 0) {
        definitionsWereAddedInLastPass = true;
        const replacements = this._createReplacementsForGroups(similarNodeGroups, definitions);
        this._applyReplacements(replacements);
      }

    } while (definitionsWereAddedInLastPass);

    return [...definitions.values(), ...initialYamlNodes];
  }

  /**
   * Recursively collects all nodes that can be processed for deduplication.
   * It skips simple references but includes children of overridden references.
   */
  private _collectAllProcessableNodes(nodes: YamlNode[]): YamlNode[] {
    const collected: YamlNode[] = [];
    const visitor = (node: YamlNode) => {
      // An overridden ref (ref with children) is not a leaf; its children can be deduplicated.
      if (node.ref && node.children) {
        node.children.forEach(visitor);
        return;
      }
      // A simple ref is a leaf in terms of definition; its structure is defined elsewhere.
      if (node.ref) {
        return;
      }

      collected.push(node);
      if (node.children) {
        node.children.forEach(visitor);
      }
    };

    nodes.forEach(visitor);
    return collected;
  }

  /**
   * Groups nodes based on their structural similarity.
   * Uses a N^2 comparison, which is acceptable for a moderate number of nodes.
   */
  private _findSimilarNodeGroups(nodes: YamlNode[]): YamlNode[][] {
    const groups: YamlNode[][] = [];
    const visited = new Set<YamlNode>();

    for (const templateNode of nodes) {
      if (visited.has(templateNode)) continue;

      const similarGroup = [templateNode];
      visited.add(templateNode);

      for (const candidateNode of nodes) {
        if (visited.has(candidateNode)) continue;

        if (this._areNodesSimilar(templateNode, candidateNode)) {
          similarGroup.push(candidateNode);
          visited.add(candidateNode);
        }
      }

      if (similarGroup.length > 1) {
        groups.push(similarGroup);
      }
    }
    return groups;
  }

  /**
   * Creates definitions and replacement information for each group of similar nodes.
   */
  private _createReplacementsForGroups(groups: YamlNode[][], definitions: Map<string, YamlNode>): Map<YamlNode, ReplacementInfo> {
    const replacements = new Map<YamlNode, ReplacementInfo>();

    for (const group of groups) {
      const templateNode = group[0];
      const refName = this._generateUniqueRefName(templateNode.name);
      const { common, variables } = this._findCommonAndVariableProperties(group);

      // Create and store the definition
      const definitionNode: YamlNode = {
        name: refName,
        type: templateNode.type,
      };
      if (Object.keys(common).length > 0) definitionNode.properties = common;
      definitions.set(refName, definitionNode);

      // Create replacement info for each node in the group
      group.forEach((node, index) => {
        const boundVariables = variables[index];
        const replacementInfo: ReplacementInfo = { ref: refName };

        if (Object.keys(boundVariables).length > 0) {
          replacementInfo.boundVariables = boundVariables;
        }

        replacements.set(node, replacementInfo);
      });
    }
    return replacements;
  }

  /**
   * Applies the generated replacements to the actual nodes in the tree.
   */
  private _applyReplacements(replacements: Map<YamlNode, ReplacementInfo>): void {
    replacements.forEach((info, node) => {
      // Clear all properties of the original node except 'children', which is handled separately.
      Object.keys(node).forEach(key => {
        if (key !== 'children') delete (node as any)[key];
      });

      // Apply the reference and variables
      node.ref = info.ref;
      if (info.boundVariables) {
        node.boundVariables = info.boundVariables;
      }
    });
  }

  /**
   * Generates a unique reference name based on the template node name.
   * If the name already exists, appends an incremental suffix.
   */
  private _generateUniqueRefName(baseName: string): string {
    const sanitizedName = baseName.replace(/[\s=]/g, '_');
    
    if (!this.usedNames.has(sanitizedName)) {
      this.usedNames.add(sanitizedName);
      return sanitizedName;
    }

    let counter = 1;
    let uniqueName: string;
    do {
      uniqueName = `${sanitizedName}_${counter}`;
      counter++;
    } while (this.usedNames.has(uniqueName));
    
    this.usedNames.add(uniqueName);
    return uniqueName;
  }

  // --- Similarity Logic ---

  /**
   * 比较两个属性值，对数值类型进行四舍五入到两位小数后比较
   */
  private _comparePropertyValues(valueA: PropertyValue, valueB: PropertyValue): boolean {
    // 如果两个值都是数字，进行四舍五入比较
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      const roundedA = Math.round(valueA * 100) / 100;
      const roundedB = Math.round(valueB * 100) / 100;
      return roundedA === roundedB;
    }
    
    // 对于非数字类型，使用原有的JSON序列化比较
    return JSON.stringify(valueA) === JSON.stringify(valueB);
  }

  private _areNodesSimilar(nodeA: YamlNode, nodeB: YamlNode): boolean {
    if (nodeA.type !== nodeB.type || nodeA.name !== nodeB.name) return false;
    if (this._getPropertySimilarity(nodeA.properties, nodeB.properties) < StructuralDeduplicationMiddleware.SIMILARITY_THRESHOLD) return false;
    if (this._getChildrenSimilarity(nodeA.children, nodeB.children) < StructuralDeduplicationMiddleware.CHILDREN_SIMILARITY_THRESHOLD) return false;
    return true;
  }

  private _getPropertySimilarity(propsA?: Record<string, PropertyValue>, propsB?: Record<string, PropertyValue>): number {
    if (!propsA && !propsB) return 1;
    if (!propsA || !propsB) return 0;

    const keysA = Object.keys(propsA);
    const keysB = Object.keys(propsB);
    const allKeys = new Set([...keysA, ...keysB]);
    if (allKeys.size <= 1) return 1;

    let sameCount = 0;
    for (const key of allKeys) {
      if (this._comparePropertyValues(propsA[key], propsB[key])) {
        sameCount++;
      }
    }
    return sameCount / allKeys.size;
  }

  private _getChildrenSimilarity(childrenA?: YamlNode[], childrenB?: YamlNode[]): number {
    if (!childrenA && !childrenB) return 1;
    if (!childrenA || !childrenB) return 0;

    const lenA = childrenA.length;
    const lenB = childrenB.length;
    const maxLen = Math.max(lenA, lenB);
    if (maxLen === 0) return 1;

    // Longest Common Subsequence (LCS) algorithm to find similarity
    const dp = Array(lenA + 1).fill(0).map(() => Array(lenB + 1).fill(0));
    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const childA = childrenA[i - 1];
        const childB = childrenB[j - 1];
        // Also compare refs for accurate similarity check in subsequent passes
        if (childA.type === childB.type && childA.name === childB.name && childA.ref === childB.ref) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    const lcsLength = dp[lenA][lenB];
    return lcsLength / maxLen;
  }

  private _findCommonAndVariableProperties(nodes: YamlNode[]): { common: Record<string, PropertyValue>, variables: Record<string, PropertyValue>[] } {
    if (nodes.length === 0) return { common: {}, variables: [] };

    const allProps = nodes.map(n => n.properties || {});
    const common: Record<string, PropertyValue> = {};
    const allKeys = new Set<string>();
    allProps.forEach(props => Object.keys(props).forEach(key => allKeys.add(key)));

    for (const key of allKeys) {
      const firstValue = allProps[0][key];
      if (firstValue !== undefined && allProps.every(props => this._comparePropertyValues(props[key], firstValue))) {
        common[key] = firstValue;
      }
    }

    const variables = allProps.map(props => {
      const nodeVariables: Record<string, PropertyValue> = {};
      for (const key in props) {
        if (!(key in common)) {
          nodeVariables[key] = props[key];
        }
      }
      return nodeVariables;
    });

    return { common, variables };
  }
}