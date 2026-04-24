import type { Edge, Node } from '@xyflow/react';
import type { NormalizedTopology } from '../yaml/schema';

export type DeviceNodeData = {
  hostname: string;
  type: NormalizedTopology['devices'][number]['type'];
  role?: string;
  interfaces: NormalizedTopology['devices'][number]['interfaces'];
  protocols?: NormalizedTopology['devices'][number]['protocols'];
  view: 'physical' | 'logical';
};

export type LinkEdgeData = {
  aInterface: string;
  bInterface: string;
  type: NormalizedTopology['links'][number]['type'];
  description?: string;
};

export type TopologyGraph = {
  nodes: Node<DeviceNodeData>[];
  edges: Edge<LinkEdgeData>[];
};

/**
 * Builds a "physical" graph — one node per device, one edge per link, with
 * the exact interface names preserved in edge data so the custom node can
 * attach handles and the custom edge can render labels.
 */
export function toPhysicalGraph(topology: NormalizedTopology): TopologyGraph {
  const nodes: Node<DeviceNodeData>[] = topology.devices.map((d) => ({
    id: d.hostname,
    type: 'device',
    position: { x: 0, y: 0 }, // layout engine fills this in
    data: {
      hostname: d.hostname,
      type: d.type,
      role: d.role,
      interfaces: d.interfaces,
      protocols: d.protocols,
      view: 'physical',
    },
  }));

  const edges: Edge<LinkEdgeData>[] = topology.links.map((l, idx) => ({
    id: `link-${idx}-${l.a.device}:${l.a.interface}-${l.b.device}:${l.b.interface}`,
    source: l.a.device,
    target: l.b.device,
    sourceHandle: `if-${l.a.interface}`,
    targetHandle: `if-${l.b.interface}`,
    type: 'link',
    data: {
      aInterface: l.a.interface,
      bInterface: l.b.interface,
      type: l.type,
      description: l.description,
    },
  }));

  return { nodes, edges };
}
