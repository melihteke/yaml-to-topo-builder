'use client';

import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';
import type { LinkEdgeData } from '@/lib/transform/toGraph';

const TYPE_COLORS: Record<string, string> = {
  l2: '#0f766e',
  l3: '#1f5ee6',
  lacp: '#be123c',
  trunk: '#7c3aed',
  access: '#0ea5e9',
};

export function LinkEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    selected,
    style,
    animated,
  } = props;

  const d = data as LinkEdgeData | undefined;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const stroke = d?.type ? TYPE_COLORS[d.type] ?? 'currentColor' : 'currentColor';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke,
          strokeWidth: selected ? 2.4 : 1.6,
          strokeDasharray: animated ? '6 4' : undefined,
          ...style,
        }}
      />
      {(d?.aInterface || d?.bInterface) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="pointer-events-none select-none rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-1.5 py-0.5 text-[10px] font-mono text-[rgb(var(--fg))] shadow-sm"
          >
            {d?.aInterface}
            {d?.aInterface && d?.bInterface ? ' ↔ ' : ''}
            {d?.bInterface}
            {d?.description ? (
              <span className="ml-1 muted">· {d.description}</span>
            ) : null}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
