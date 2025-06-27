/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FigmaNode, Middleware } from './FigmaDataConverter';

export class StructuralExtractorMiddleware implements Middleware {
  name = 'StructuralExtractorMiddleware';

  beforeProcessNode(node: FigmaNode): FigmaNode {
    return this.extract(node);
  }

  private extract(node: any): any {
    if (!node) {
      return null;
    }

    const newNode: any = {
      name: node.name,
    };

    if (node.children) {
      newNode.children = node.children.map((child: any) => this.extract(child));
    }

    return newNode;
  }
}
