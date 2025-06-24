#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import https from 'https';

// 配置变量
const CONFIG = {
  figmaFileKey: 'rghzt6WHC6NtQwFeibnbRo',
  iconsRootNodeId: '55594:2485',
  iconsOutputDir: 'src/components/mdui/icons',
  figmaToken: '',
  tmpDir: 'tmp/icons'
};

// 类型定义
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

interface FigmaNodesResponse {
  nodes: Record<string, { document: FigmaNode }>;
}

interface FigmaImagesResponse {
  images: Record<string, string>;
}

// 工具函数：创建目录
async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

// 工具函数：带重试的下载文件
function downloadFile(url: string, filePath: string, retries: number = 3): Promise<void> {
  return fetch(url, {
    method: 'GET',
  }).then(res => res.text()).then(text => {
    fs.writeFile(filePath, text);
  }).catch(err => {
    console.error(`❌ 下载 ${url} 失败:`, err);
    if (retries > 0) {
      console.warn(`⚠️ 重试下载...`);
      return downloadFile(url, filePath, retries - 1);
    }
  });
}

// 发送 Figma API 请求
async function figmaRequest<T>(endpoint: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': CONFIG.figmaToken
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Figma API error: ${res.statusCode} ${res.statusMessage}`));
          return;
        }
        
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// 1. 获取图标节点数据
async function getIconsNodeData(): Promise<FigmaNode[]> {
  console.log('🔍 获取图标节点数据...');
  
  const endpoint = `/v1/files/${CONFIG.figmaFileKey}/nodes?ids=${CONFIG.iconsRootNodeId}`;
  const response = await figmaRequest<FigmaNodesResponse>(endpoint);
  
  const rootNode = response.nodes[CONFIG.iconsRootNodeId]?.document;
  if (!rootNode) {
    throw new Error('未找到根节点');
  }
  
  // 提取所有图标节点
  const iconNodes: FigmaNode[] = [];
  
  function extractIconNodes(node: FigmaNode) {
    if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
      iconNodes.push(node);
    }
    if (node.children) {
      node.children.forEach(extractIconNodes);
    }
  }
  
  extractIconNodes(rootNode);
  console.log(`✅ 找到 ${iconNodes.length} 个图标节点`);
  
  return iconNodes;
}

// 2. 获取图标 SVG URLs
async function getIconSvgUrls(iconNodes: FigmaNode[]): Promise<Record<string, string>> {
  console.log('🔗 获取图标 SVG URLs...');
  
  const nodeIds = iconNodes.map(node => node.id).join(',');
  const endpoint = `/v1/images/${CONFIG.figmaFileKey}?ids=${nodeIds}&format=svg`;
  
  const response = await figmaRequest<FigmaImagesResponse>(endpoint);
  
  console.log(`✅ 获取到 ${Object.keys(response.images).length} 个 SVG URLs`);
  return response.images;
}

// 工具函数：限制并发数的 Promise 执行
async function limitConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number = 3
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      results.push(result);
    });
    
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }
  
  await Promise.all(executing);
  return results;
}

// 3. 下载图标 SVG 文件
async function downloadIconSvgs(svgUrls: Record<string, string>): Promise<void> {
  console.log('⬇️ 下载图标 SVG 文件...');
  
  await ensureDir(CONFIG.tmpDir);
  
  // 检查哪些文件需要下载
  const downloadTasks: (() => Promise<void>)[] = [];
  let skipCount = 0;
  
  for (const [nodeId, url] of Object.entries(svgUrls)) {
    const filePath = path.join(CONFIG.tmpDir, `${nodeId}.svg`);
    
    try {
      // 检查文件是否已存在
      await fs.access(filePath);
      skipCount++;
      console.log(`⏭️ 跳过已存在的文件: ${nodeId}.svg`);
    } catch {
      // 文件不存在，需要下载
      downloadTasks.push(() => downloadFile(url, filePath));
    }
  }
  
  if (skipCount > 0) {
    console.log(`📁 跳过 ${skipCount} 个已存在的文件`);
  }
  
  if (downloadTasks.length > 0) {
    await limitConcurrency(downloadTasks, 1);
    console.log(`✅ 下载完成 ${downloadTasks.length} 个新 SVG 文件`);
  } else {
    console.log('✅ 所有文件都已存在，无需下载');
  }
}

// 4. 清理 SVG 内容
function cleanSvgContent(svgContent: string): string {
  return svgContent
    // 移除 fill 属性，使用 currentColor
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    // 移除不必要的属性
    .replace(/\s*(width|height)="[^"]*"/g, '')
    // 添加默认的 viewBox（如果没有的话）
    .replace(/<svg([^>]*?)>/, (match, attributes) => {
      if (!attributes.includes('viewBox')) {
        return `<svg${attributes} viewBox="0 0 24 24">`;
      }
      return match;
    });
}

// 5. 生成图标组件名称
function generateComponentName(iconName: string): string {
  return iconName
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('') + 'Icon';
}

// 6. 生成 React 组件
async function generateIconComponents(iconNodes: FigmaNode[]): Promise<void> {
  console.log('⚛️ 生成 React 组件...');
  
  await ensureDir(CONFIG.iconsOutputDir);
  
  const components = await Promise.all(iconNodes.map(async (node) => {
    const svgFilePath = path.join(CONFIG.tmpDir, `${node.id}.svg`);
    
    try {
      const svgContent = await fs.readFile(svgFilePath, 'utf8');
      const cleanedSvg = cleanSvgContent(svgContent);
      const componentName = generateComponentName(node.name);
      
      let svgInner = cleanedSvg.replace(/<svg[^>]*>|<\/svg>/g, '');
      
      svgInner = svgInner.replace(/\s*fill="[^"]*"/g, '');
      
      const componentCode = `import React from 'react';

interface ${componentName}Props {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  size = 24, 
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      ${svgInner}
    </svg>
  );
};

export default ${componentName};
`;
      
      const outputPath = path.join(CONFIG.iconsOutputDir, `${componentName}.tsx`);
      await fs.writeFile(outputPath, componentCode);
      
      return { name: node.name, componentName, outputPath };
    } catch (error) {
      console.error(`❌ 生成 ${node.name} 组件失败:`, error);
      return null;
    }
  }));
  
  const successfulComponents = components.filter((comp): comp is { name: string; componentName: string; outputPath: string } => comp !== null);
  console.log(`✅ 成功生成 ${successfulComponents.length} 个组件`);
  
  // 生成索引文件
  await generateIndexFile(successfulComponents);
}

// 7. 生成索引文件
async function generateIndexFile(components: Array<{ componentName: string }>) {
  console.log('📝 生成索引文件...');
  
  const exports = components.map(comp => 
    `export { ${comp.componentName} } from './${comp.componentName}';`
  ).join('\n');
  
  const indexContent = `
${exports}
`;
  
  const indexPath = path.join(CONFIG.iconsOutputDir, 'index.ts');
  await fs.writeFile(indexPath, indexContent);
  
  console.log('✅ 索引文件生成完成');
}

// 主函数
async function main(): Promise<void> {
  console.log('🚀 开始生成 MD Icons...\n');
  
  try {
    // 1. 获取图标节点数据
    const iconNodes = await getIconsNodeData();
    
    // 2. 获取图标 SVG URLs
    const svgUrls = await getIconSvgUrls(iconNodes);
    
    // 3. 下载图标 SVG 文件
    await downloadIconSvgs(svgUrls);
    
    // 4. 生成图标组件
    await generateIconComponents(iconNodes);
    
    // 5. 清理临时文件
    // await cleanup();
    
    console.log('\n🎉 MD Icons 生成完成！');
    console.log(`📂 输出目录: ${CONFIG.iconsOutputDir}`);
    
  } catch (error) {
    console.error('\n❌ 生成过程中出现错误:', error);
    process.exit(1);
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
