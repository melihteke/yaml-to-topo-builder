# src/lib/export — Export Pipeline (Phase 3 target)

This directory is intentionally empty in the Phase 1–2 MVP. It becomes the
home of the export pipeline when Phase 3 lands.

## Planned files

- `svg.ts` — render the current React Flow viewport to an SVG string using
  `html-to-image` `toSvg()`. Strip UI chrome (minimap, controls) before
  capture.
- `png.ts` — same lib, `toPng()`; used for the "Copy image" action.
- `pdf.ts` — feed the SVG into `jsPDF` via `svg2pdf.js` for a **vector** PDF.
  Avoid `html2canvas` — it rasterises and the output is blurry at print size.
- `html.ts` — wrap the SVG in a single-file HTML template with inline CSS,
  a metadata header (topology name, requester, timestamp, view), and a
  printable hostname/interface table.
- `metadata.ts` — `buildMetadataBlock(topology, view)` returning `{ title,
  requester, generatedAt, nodesCount, edgesCount }`. Used by every exporter.
- `index.ts` — a single `exportTopology(format, opts)` entry point the UI
  calls; it dispatches to the right module.

## UI

A single export menu in the top bar next to the view toggle, with four items:
**Download SVG**, **Download PNG**, **Download PDF**, **Download HTML**. All
four call into `src/lib/export/index.ts` and offer the resulting blob for
download via `URL.createObjectURL`.

## Don'ts

- Don't use `puppeteer-in-browser`, server-side rendering, or any tool that
  calls home. Everything must stay client-side to keep NetWeave a pure
  static site.
- Don't inline the React Flow attribution — we hide it via `proOptions` on
  the canvas already; re-adding it at export time would violate the visual
  consistency users expect.
