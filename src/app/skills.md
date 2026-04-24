# src/app — Routes & Pages

## Conventions

- **App Router only.** No `pages/` directory.
- Each route is a folder with a `page.tsx` (or `page.mdx`). Shared chrome
  (header, theme) lives in `src/app/layout.tsx`.
- Pages that need the browser APIs (editor, canvas, theme toggle) start with
  `'use client'` at the top. Pure-content pages stay server-rendered so they
  ship as plain HTML in the static export.

## Routes

| Path                     | Component                            | Purpose                                            |
| ------------------------ | ------------------------------------ | -------------------------------------------------- |
| `/`                      | `src/app/page.tsx`                   | Editor + canvas, the main product                  |
| `/examples/`             | `src/app/examples/page.tsx`          | Gallery of loadable example YAMLs                  |
| `/docs/`                 | `src/app/docs/page.tsx`              | Index of the docs section                          |
| `/docs/schema/`          | `src/app/docs/schema/page.tsx`       | NetWeave v1 schema reference                       |
| `/docs/containerlab/`    | `src/app/docs/containerlab/page.tsx` | ContainerLab compatibility notes                   |
| `/docs/exporting/`       | `src/app/docs/exporting/page.tsx`    | Export formats (Phase 3 preview)                   |
| `/about/`                | `src/app/about/page.tsx`             | Project philosophy + credits                       |

## Trailing slashes

`trailingSlash: true` is set in `next.config.mjs`. Always link with a trailing
slash (e.g. `/docs/schema/`) so GitHub Pages serves the generated
`docs/schema/index.html` without a redirect.

## basePath discipline

For any asset or fetch happening at runtime, prefix with
`process.env.NEXT_PUBLIC_BASE_PATH`. Next's own `<Link>` handles this
automatically, but raw `fetch('/examples/...')` does not.

## Adding a route

1. Create `src/app/<slug>/page.tsx`.
2. Link to it from `Header.tsx` if it's top-level, or from its parent index
   page.
3. If the page is interactive, mark it `'use client'` — otherwise keep it a
   Server Component for faster static exports.
