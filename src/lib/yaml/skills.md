# src/lib/yaml — Schemas, Detection, Parsing

## What's here

- `schema.ts` — all Zod schemas for NetWeave v1 and ContainerLab, plus the
  `NormalizedTopology` type that the rest of the app consumes.
- `detect.ts` — one-liner that picks the format from a parsed YAML document
  by looking at root keys.
- `parse.ts` — the orchestrator: `js-yaml.load` → `detectFormat` → correct
  Zod schema → normalise to `NormalizedTopology`.

## The normalised model

Everything downstream (`toGraph`, `toLogical`, the canvas, the editor status
bar) operates on `NormalizedTopology`. That's the **only contract** new input
formats need to satisfy. Adding a third format (e.g. Batfish) is a matter of
writing a new schema + a `normalizeBatfish()` function and teaching
`detect.ts` about its root key.

## Evolving the schema (bumping to v2)

1. Create a new file `schema.v2.ts` next to `schema.ts` to keep the old one
   readable during migration.
2. Update `apiVersion: netweave.io/v2` in `schema.v2.ts`.
3. In `detect.ts`, return `'netweave'` for any `netweave.io/*` prefix.
4. In `parse.ts`, branch on the exact `apiVersion` before calling the right
   schema's `safeParse`.
5. Write a `migrateV1ToV2` helper if you want the app to accept v1 input
   silently; otherwise surface a helpful "please bump apiVersion" error.

## Adding a protocol

- Extend `Protocols` in `schema.ts` (e.g. add an `eigrp` object).
- Update `NormalizedDevice.protocols` if it's not picked up automatically.
- Add the overlay logic in `src/lib/transform/toLogical.ts`.
- (Optional) Expose a visible badge on `DeviceNode.tsx`.

## Adding a device or interface kind

- Extend `DeviceType` / `InterfaceKind` / `LinkType` unions.
- For device types, also update `STENCILS` in
  `src/lib/stencils/manifest.ts` and drop the SVG.

## ContainerLab specifics

- We only read what we need: `topology.nodes`, `topology.links`, node
  `kind` / `image` / `group` / `mgmt_ipv4` / `mgmt_ipv6`.
- The `topology.kinds` / `topology.defaults` blocks are validated as open
  records but not consumed. Don't remove them from the Zod schema — some
  users paste full lab files.
- The `kind → DeviceType` mapping lives in the `CLAB_KIND_TO_TYPE` table in
  `parse.ts`. Add new entries there; fallbacks inspect the image string.

## Error messages

All Zod errors surface via `parseTopologyYaml` as
`{ ok: false, error, details[] }`. The UI renders `error` as a headline and
`details` as a bulleted list under the editor. Keep error messages short —
the user already sees the line in CodeMirror.
