'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DeviceNode } from './nodes/DeviceNode';
import { LinkEdge } from './edges/LinkEdge';
import { toPhysicalGraph } from '@/lib/transform/toGraph';
import { toLogicalGraph } from '@/lib/transform/toLogical';
import { applyElkLayout } from '@/lib/layout/elk';
import { applyDagreLayout } from '@/lib/layout/dagre';
import type { NormalizedTopology } from '@/lib/yaml/schema';
import type { TopologyView } from './ViewToggle';

const nodeTypes = { device: DeviceNode };
const edgeTypes = { link: LinkEdge };

export function TopologyCanvas({
  topology,
  view,
  engine = 'elk',
}: {
  topology: NormalizedTopology | null;
  view: TopologyView;
  engine?: 'elk' | 'dagre';
}) {
  return (
    <ReactFlowProvider>
      <CanvasInner topology={topology} view={view} engine={engine} />
    </ReactFlowProvider>
  );
}

function CanvasInner({
  topology,
  view,
  engine,
}: {
  topology: NormalizedTopology | null;
  view: TopologyView;
  engine: 'elk' | 'dagre';
}) {
  const graph = useMemo(() => {
    if (!topology) return { nodes: [] as Node[], edges: [] as Edge[] };
    return view === 'physical' ? toPhysicalGraph(topology) : toLogicalGraph(topology);
  }, [topology, view]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges as Edge[]);
  const [laying, setLaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function layout() {
      setLaying(true);
      try {
        const laidNodes =
          engine === 'elk'
            ? await applyElkLayout(graph.nodes as Node[], graph.edges as Edge[], 'TB')
            : applyDagreLayout(graph.nodes as Node[], graph.edges as Edge[], 'TB');
        if (cancelled) return;
        setNodes(laidNodes);
        setEdges(graph.edges as Edge[]);
      } catch {
        if (cancelled) return;
        const fallback = applyDagreLayout(graph.nodes as Node[], graph.edges as Edge[], 'TB');
        setNodes(fallback);
        setEdges(graph.edges as Edge[]);
      } finally {
        if (!cancelled) setLaying(false);
      }
    }
    layout();
    return () => {
      cancelled = true;
    };
  }, [graph, engine, setNodes, setEdges]);

  if (!topology) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <div className="mb-1 text-sm font-semibold">No topology loaded</div>
          <p className="text-xs muted">
            Paste a NetWeave or ContainerLab YAML in the editor, or pick one from the{' '}
            <a className="accent underline" href="examples/">
              examples gallery
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.15}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} />
        <Controls position="bottom-right" showInteractive={false} />
        <MiniMap position="bottom-left" pannable zoomable />
      </ReactFlow>
      {laying ? (
        <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-2 py-1 text-[11px] muted shadow-sm">
          laying out…
        </div>
      ) : null}
    </div>
  );
}
