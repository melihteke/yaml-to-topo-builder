import ELK from 'elkjs/lib/elk.bundled.js';
import { Position, type Edge, type Node } from '@xyflow/react';

export type LayoutDirection = 'TB' | 'LR';

const NODE_WIDTH = 220;
const NODE_HEIGHT = 160;

const elk = new ELK();

export async function applyElkLayout(
  nodes: Node[],
  edges: Edge[],
  direction: LayoutDirection = 'TB',
): Promise<Node[]> {
  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': direction === 'TB' ? 'DOWN' : 'RIGHT',
      'elk.layered.spacing.nodeNodeBetweenLayers': '100',
      'elk.spacing.nodeNode': '60',
      'elk.layered.crossingMinimization.semiInteractive': 'true',
    },
    children: nodes.map((n) => ({
      id: n.id,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    })),
    edges: edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  const laid = await elk.layout(graph);
  const byId = new Map<string, { x: number; y: number }>();
  for (const c of laid.children ?? []) {
    byId.set(c.id, { x: c.x ?? 0, y: c.y ?? 0 });
  }

  return nodes.map((n) => ({
    ...n,
    position: byId.get(n.id) ?? { x: 0, y: 0 },
    targetPosition: direction === 'TB' ? Position.Top : Position.Left,
    sourcePosition: direction === 'TB' ? Position.Bottom : Position.Right,
  }));
}
