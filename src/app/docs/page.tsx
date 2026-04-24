import Link from 'next/link';
import { Header } from '@/components/Layout/Header';

export default function DocsHome() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 overflow-auto px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Documentation</h1>
        <p className="mt-1 text-sm muted">
          NetWeave parses two formats, renders them, and (in Phase 3) exports them. Start with the
          schema reference, then skim the ContainerLab notes if you bring a lab file from disk.
        </p>
        <ul className="mt-6 grid gap-3">
          <DocCard href="/docs/schema/" title="NetWeave v1 schema" summary="Every field, every default, every validation rule." />
          <DocCard href="/docs/containerlab/" title="ContainerLab support" summary="Which CLAB fields are honoured and how kinds map to stencils." />
          <DocCard href="/docs/exporting/" title="Exporting diagrams" summary="SVG, PNG, PDF and self-contained HTML — what will land in Phase 3." />
        </ul>
      </main>
    </div>
  );
}

function DocCard({ href, title, summary }: { href: string; title: string; summary: string }) {
  return (
    <li>
      <Link href={href} className="block panel rounded-xl p-4 shadow-card transition hover:shadow-md">
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-xs muted">{summary}</div>
      </Link>
    </li>
  );
}
