'use client';

import { Layers, GitBranch } from 'lucide-react';

export type TopologyView = 'physical' | 'logical';

export function ViewToggle({
  value,
  onChange,
}: {
  value: TopologyView;
  onChange: (v: TopologyView) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => onChange('physical')}
        className={[
          'inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition',
          value === 'physical' ? 'bg-brand-500 text-white shadow-sm' : 'muted hover:text-[rgb(var(--fg))]',
        ].join(' ')}
      >
        <GitBranch className="h-3.5 w-3.5" />
        Physical
      </button>
      <button
        type="button"
        onClick={() => onChange('logical')}
        className={[
          'inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition',
          value === 'logical' ? 'bg-brand-500 text-white shadow-sm' : 'muted hover:text-[rgb(var(--fg))]',
        ].join(' ')}
      >
        <Layers className="h-3.5 w-3.5" />
        Logical
      </button>
    </div>
  );
}
