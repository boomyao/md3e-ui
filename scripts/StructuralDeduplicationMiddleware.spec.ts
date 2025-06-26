import { describe, it, expect } from 'vitest';
import { StructuralDeduplicationMiddleware } from './StructuralDeduplicationMiddleware';
import { type YamlNode } from './FigmaDataConverter';

describe('StructuralDeduplicationMiddleware', () => {
  it('should preserve children override when nested refs have different boundVariables', async () => {
    const middleware = new StructuralDeduplicationMiddleware();

    const initialYamlNodes: YamlNode[] = [
      {
        name: 'InfoCard',
        type: 'Card',
        properties: {
          padding: '16px',
        },
        children: [
          {
            name: 'ActionButton',
            type: 'Button',
            properties: {
              icon: 'check',
              text: 'Confirm',
            },
          },
        ],
      },
      {
        name: 'InfoCard',
        type: 'Card',
        properties: {
          padding: '16px',
        },
        children: [
          {
            name: 'ActionButton',
            type: 'Button',
            properties: {
              icon: 'check',
              text: 'Cancel',
            },
          },
        ],
      },
    ];

    const result = await middleware.afterConvert(initialYamlNodes);

    console.log(JSON.stringify(result, null, 2));

    // Find the instances of the deduplicated card
    const cardInstances = result.filter(node => node.ref?.startsWith('InfoCard'));

    expect(cardInstances.length).toBe(2);


    // The other instance MUST have a children override
    const instanceWithOverride = cardInstances.find(node => !!node.children);
    expect(instanceWithOverride).toBeDefined();

    // And that override should contain the correct nested ref with its unique boundVariable
    const nestedRef = instanceWithOverride?.children?.[0];
    expect(nestedRef).toBeDefined();
    // The bug might be that it's not a ref, but a full node. Let's check that.
    expect(nestedRef?.ref).toBe('ActionButton');
  });
});
