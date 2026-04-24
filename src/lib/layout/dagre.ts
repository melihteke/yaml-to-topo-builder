import dagre from 'dagre';
import { Position, type Edge, type Node } from '@xyflow/react';

export type LayoutDirection = 'TB' | 'LR';

const NODE_WIDTH = 220;
const NODE_HEIGHT = 160;

export function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  direction: LayoutDirection = 'TB',
): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: direction, ranksep: 90, nodesep: 60 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const n of nodes) g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  for (const e of edges) g.setEdge(e.source, e.target);

  dagre.layout(g);

  return nodes.map((n) => {
    const pos = g.node(n.id);
    return {
      ...n,
      position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 },
      targetPosition: direction === 'TB' ? Position.Top : Position.Left,
      sourcePosition: direction === 'TB' ? Position.Bottom : Position.Right,
    };
  });
}
