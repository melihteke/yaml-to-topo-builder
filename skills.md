# NetWeave — Repo-wide Conventions

This file is a *maintainer guide*, not end-user docs. It explains the shape of
the project so that you (or an AI assistant like Claude Code) can make changes
quickly without re-reading the whole codebase.

## What NetWeave is

A fully static, client-side Next.js app that parses network topology YAML
(native NetWeave v1 or ContainerLab) and renders it as an interactive diagram
in the browser. Hosted on GitHub Pages at
`https://melihteke.github.io/yaml-to-topo-builder/`.

## Stack

- **Next.js 15+ App Router**, TypeScript strict, `output: 'export'`
- **Tailwind CSS v3** — dark mode via `class` and `next-themes`
- **React Flow (`@xyflow/react`)** — canvas, handles, edges
- **ELK** (`elkjs`) primary layout, **dagre** fallback
- **CodeMirror 6** — YAML editor (`@codemirror/lang-yaml`)
- **js-yaml + Zod** — parsing and validation
- **Zustand** — client state (not used much yet; canvas is currently local)

## Directory Map

```
src/
  app/                    # routes: /, /docs, /docs/schema, /docs/containerlab,
                          #        /docs/exporting, /examples, /about
  components/
    Canvas/               # React Flow wiring, custom nodes and edges
    Editor/               # CodeMirror editor
    Layout/               # Header, ThemeProvider
  lib/
    yaml/                 # schema (Zod), parse, detect
    transform/            # toGraph (physical), toLogical
    layout/               # elk.ts, dagre.ts
    stencils/             # manifest (device-type -> SVG path)
    examples/             # starter YAML inlined for initial render
  styles/                 # globals.css
public/
  stencils/netweave/      # SVG device icons
  examples/               # loadable example YAMLs
```

## Global Rules

- **No backend.** Everything runs in the browser.
- **Path-safe:** always respect `process.env.NEXT_PUBLIC_BASE_PATH` for
  anything loaded at runtime (e.g. fetching `/examples/*.yaml`). Never hard-code
  a leading `/`.
- **Keep the bundle lean.** Prefer CodeMirror over Monaco, React Flow over
  drag-drop engines with heavy dependencies, SVG over raster icons.
- **Static-first.** Don't reach for server components, middleware, or API
  routes — they break `output: 'export'`.
- **YAML is the source of truth** for topologies. The internal graph model is
  derived from YAML every time the user types; canvas edits in Phase 3 will
  write back to YAML, not mutate a parallel state tree.

## Common Tasks

### Add a new device type
1. Drop `public/stencils/netweave/<kebab-name>.svg` (96x96 viewBox).
2. Add the key to `DeviceType` in `src/lib/yaml/schema.ts`.
3. Add an entry to `STENCILS` in `src/lib/stencils/manifest.ts`.
4. (Optional) Teach the ContainerLab kind mapper in
   `src/lib/yaml/parse.ts` (`CLAB_KIND_TO_TYPE`).

### Add a new interface or link kind
1. Extend `InterfaceKind` or `LinkType` in `src/lib/yaml/schema.ts`.
2. Decide whether it should be visible in the logical view
   (`src/lib/transform/toLogical.ts`).
3. (Optional) Pick a colour in `TYPE_COLORS` in
   `src/components/Canvas/edges/LinkEdge.tsx`.

### Add a protocol overlay
1. Extend `Protocols` in `src/lib/yaml/schema.ts`.
2. Build the overlay inside `toLogical.ts` (see the BGP overlay for a pattern).
3. Surface it on the node via `DeviceNode.tsx`.

### Add an example YAML
1. Drop the file under `public/examples/`.
2. Add a row to the `EXAMPLES` array in `src/app/examples/page.tsx`.

## Deployment

`.github/workflows/pages.yml` on push to `main` -> `npm ci && npm run build` ->
upload `out/` as a GitHub Pages artifact -> `actions/deploy-pages@v4`.
`basePath` is set to `/yaml-to-topo-builder` only in production builds;
`npm run dev` uses an empty base path so local paths work.

## Conventions

- **TypeScript strict**, no `any` unless the library forces it.
- **Server Components** for static pages (docs, examples, about), **Client
  Components** (`'use client'`) only where we need React hooks or DOM access
  (editor, canvas, theme toggle).
- **No CSS modules** - Tailwind everywhere plus a short list of CSS custom
  properties in `globals.css`.
- **No runtime environment variables** other than `NEXT_PUBLIC_BASE_PATH`.
