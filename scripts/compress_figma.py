#!/usr/bin/env python3
"""
Figma 文档数据压缩脚本
压缩 figma.json 文件，移除不必要的字段并优化数据结构
"""

import json
import os
from typing import Dict, Any, Set, List, Optional


def load_blacklist(blacklist_path: str) -> Set[str]:
    """加载黑名单字段列表"""
    with open(blacklist_path, 'r', encoding='utf-8') as f:
        return {line.strip() for line in f if line.strip()}


def extract_padding(node: Dict[str, Any]) -> Optional[List[float]]:
    """提取并合并 padding 字段 [top, right, bottom, left]"""
    padding_fields = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
    padding_values = []
    
    for field in padding_fields:
        if field in node:
            padding_values.append(node[field])
        else:
            padding_values.append(0.0)
    
    # 如果所有padding都是0，返回None
    if all(p == 0 for p in padding_values):
        return None
    
    # 简化padding表示
    # 如果四个值相同，返回单个值
    if len(set(padding_values)) == 1:
        return [padding_values[0]]
    
    # 如果上下相同，左右相同，返回两个值 [vertical, horizontal]
    if padding_values[0] == padding_values[2] and padding_values[1] == padding_values[3]:
        return [padding_values[0], padding_values[1]]
    
    # 否则返回完整的四个值
    return padding_values


def extract_size_from_bounding_box(node: Dict[str, Any]) -> Dict[str, float]:
    """从 absoluteBoundingBox 中提取 width 和 height"""
    size = {}
    if 'absoluteBoundingBox' in node:
        bbox = node['absoluteBoundingBox']
        if 'width' in bbox:
            size['width'] = bbox['width']
        if 'height' in bbox:
            size['height'] = bbox['height']
    return size


def resolve_style_names(node: Dict[str, Any], styles_map: Dict[str, Dict[str, Any]]) -> Dict[str, str]:
    """解析 styles 字段中的 fill 和 stroke，转换 ID 为 name"""
    style_names = {}
    
    if 'styles' in node:
        styles = node['styles']
        
        # 处理 fill/fills
        if 'fill' in styles and styles['fill'] in styles_map:
            style_names['fill'] = styles_map[styles['fill']]['name']
        elif 'fills' in styles and styles['fills'] in styles_map:
            style_names['fill'] = styles_map[styles['fills']]['name']
        
        # 处理 stroke/strokes  
        if 'stroke' in styles and styles['stroke'] in styles_map:
            style_names['stroke'] = styles_map[styles['stroke']]['name']
        elif 'strokes' in styles and styles['strokes'] in styles_map:
            style_names['stroke'] = styles_map[styles['strokes']]['name']

        if 'text' in styles and styles['text'] in styles_map:
            style_names['text'] = styles_map[styles['text']]['name']
    
    return style_names


def clean_node(node: Dict[str, Any], blacklist: Set[str], styles_map: Dict[str, Dict[str, Any]]) -> Dict[str, Any]:
    """清理单个节点数据"""
    cleaned = {}
    
    # 复制非黑名单字段
    for key, value in node.items():
        if key not in blacklist:
            if isinstance(value, dict):
                # 递归处理嵌套对象，但跳过某些特殊字段
                if key == 'children' and isinstance(value, list):
                    cleaned[key] = [clean_node(child, blacklist, styles_map) for child in value]
                elif key not in ['absoluteBoundingBox', 'styles']:  # 这些字段需要特殊处理
                    cleaned[key] = clean_node(value, blacklist, styles_map)
                else:
                    cleaned[key] = value
            elif isinstance(value, list):
                # 处理数组，如果数组元素是对象则递归清理
                cleaned[key] = []
                for item in value:
                    if isinstance(item, dict):
                        cleaned[key].append(clean_node(item, blacklist, styles_map))
                    else:
                        cleaned[key].append(item)
            else:
                cleaned[key] = value
    
    # 特殊处理：提取尺寸信息
    size = extract_size_from_bounding_box(node)
    if size:
        cleaned.update(size)
    
    # 特殊处理：合并 padding
    padding = extract_padding(node)
    if padding:
        cleaned['padding'] = padding
    
    # 特殊处理：解析样式名称
    style_names = resolve_style_names(node, styles_map)
    if style_names:
        cleaned.update(style_names)
    
    return cleaned


def compress_figma_document(figma_data: Dict[str, Any], blacklist: Set[str]) -> Dict[str, Any]:
    """压缩 Figma 文档数据"""
    
    # 获取样式映射表
    styles_map = {}
    if 'nodes' in figma_data:
        for node_id, node_data in figma_data['nodes'].items():
            if 'styles' in node_data:
                styles_map.update(node_data['styles'])
    
    # 只保留 nodes 中的 document 部分
    compressed = {
        'name': figma_data.get('name', ''),
        'lastModified': figma_data.get('lastModified', ''),
        'version': figma_data.get('version', ''),
        'nodes': {}
    }
    
    # 处理 nodes
    if 'nodes' in figma_data:
        for node_id, node_data in figma_data['nodes'].items():
            if 'document' in node_data:
                cleaned_document = clean_node(node_data['document'], blacklist, styles_map)
                compressed['nodes'][node_id] = {
                    'document': cleaned_document
                }
    
    return compressed


def main():
    """主函数"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 文件路径
    figma_json_path = os.path.join(script_dir, 'figma.json')
    blacklist_path = os.path.join(script_dir, 'blacklist.txt')
    output_path = os.path.join(script_dir, 'figma_compressed.json')
    
    print("开始压缩 Figma 文档数据...")
    
    # 加载黑名单
    print(f"加载黑名单文件: {blacklist_path}")
    blacklist = load_blacklist(blacklist_path)
    print(f"黑名单字段数量: {len(blacklist)}")
    
    # 加载 Figma 数据
    print(f"加载 Figma 数据: {figma_json_path}")
    with open(figma_json_path, 'r', encoding='utf-8') as f:
        figma_data = json.load(f)
    
    # 压缩数据
    print("开始压缩数据...")
    compressed_data = compress_figma_document(figma_data, blacklist)
    
    # 保存压缩后的数据
    print(f"保存压缩数据: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(compressed_data, f, ensure_ascii=False, separators=(',', ':'))
    
    # 显示压缩统计
    original_size = os.path.getsize(figma_json_path)
    compressed_size = os.path.getsize(output_path)
    compression_ratio = (1 - compressed_size / original_size) * 100
    
    print(f"\n压缩完成!")
    print(f"原始文件大小: {original_size:,} bytes")
    print(f"压缩后大小: {compressed_size:,} bytes") 
    print(f"压缩率: {compression_ratio:.1f}%")
    print(f"原始节点数量: {len(figma_data.get('nodes', {}))}")
    print(f"压缩后节点数量: {len(compressed_data.get('nodes', {}))}")


if __name__ == '__main__':
    main() 