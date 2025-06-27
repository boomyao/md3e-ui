#!/usr/bin/env node

import * as fs from 'fs';
import { FigmaDataConverter, type FigmaData } from './FigmaDataConverter';
import { StructuralExtractorMiddleware } from './StructuralExtractorMiddleware';
import { StructuralDeduplicationMiddleware } from './StructuralDeduplicationMiddleware'

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('请提供 JSON 文件路径参数');
    console.error('用法: tsx figma-data.ts <json-file-path>');
    process.exit(1);
  }

  const jsonFilePath = args[0];
  
  try {
    // 检查文件是否存在
    if (!fs.existsSync(jsonFilePath)) {
      console.error(`文件不存在: ${jsonFilePath}`);
      process.exit(1);
    }

    // 读取 JSON 文件
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const figmaData: FigmaData = JSON.parse(jsonContent);

    // 转换数据
    const converter = new FigmaDataConverter(figmaData);
    // converter.use(new StructuralExtractorMiddleware());
    converter.use(new StructuralDeduplicationMiddleware());
    const result = await converter.convert();

    // 可选：保存到文件
    const outputPath = jsonFilePath.replace('.json', '.yml');
    fs.writeFileSync(outputPath, result, 'utf-8');
    console.error(`\n结果已保存到: ${outputPath}`);

  } catch (error) {
    console.error('处理文件时出错:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}