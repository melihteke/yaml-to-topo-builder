import Link from 'next/link';
import { Header } from '@/components/Layout/Header';

export default function AboutPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 overflow-auto px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">About NetWeave</h1>
        <p className="mt-2 text-sm muted">
          NetWeave turns a network topology described in YAML into an interactive diagram, in
          the browser, with zero backend. Share the YAML the way engineers share code &mdash;
          the reader gets a first-class visual rendering rather than a screenshot.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Why YAML?</h2>
        <p className="mt-1 text-sm muted">
          YAML is the language of network automation: Ansible, ContainerLab, intent files.
          NetWeave meets engineers where they already are. Paste a ContainerLab lab file
          unchanged and you get a diagram.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Why static?</h2>
        <p className="mt-1 text-sm muted">
          Topology data is often sensitive. NetWeave never sends your YAML anywhere &mdash;
          a single static site that runs entirely in your browser. No account, no tracking,
          no backend.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Author</h2>
        <p className="mt-1 text-sm muted">
          <a
            className="accent underline"
            href="https://www.linkedin.com/in/melih-teke/"
            target="_blank"
            rel="noreferrer"
          >
            Melih Teke
          </a>
          {' '}&mdash; Network Engineer.
        </p>

        <h2 className="mt-6 text-lg font-semibold">How it was built</h2>
        <p className="mt-1 text-sm muted">
          This project was vibe-coded with{' '}
          <a
            className="accent underline"
            href="https://www.anthropic.com/claude"
            target="_blank"
            rel="noreferrer"
          >
            Claude Opus 4.7
          </a>{' '}
          via{' '}
          <a
            className="accent underline"
            href="https://www.anthropic.com/claude-code"
            target="_blank"
            rel="noreferrer"
          >
            Claude Code
          </a>
          .
        </p>

        <h2 className="mt-6 text-lg font-semibold">Stack</h2>
        <p className="mt-1 text-sm muted">
          <a className="accent underline" href="https://nextjs.org">Next.js</a>,{' '}
          <a className="accent underline" href="https://reactflow.dev">React Flow</a>,{' '}
          <a className="accent underline" href="https://codemirror.net">CodeMirror 6</a>,{' '}
          <a className="accent underline" href="https://tailwindcss.com">Tailwind CSS</a>,{' '}
          <a className="accent underline" href="https://github.com/kieler/elkjs">ELK</a>.
          Source on{' '}
          <Link className="accent underline" href="https://github.com/melihteke/yaml-to-topo-builder">
            GitHub
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
