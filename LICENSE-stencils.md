# Stencil Attribution & Licensing

NetWeave ships with a small set of **stylised SVG device icons** that are
original vector illustrations created for this project. They are released
under the repository's MIT license and may be freely used, modified, and
redistributed.

If a project maintainer later wants to ship the **official Cisco network
topology icons** (a very common request), please review and comply with the
terms published at:

- Cisco Brand Center — Network Topology Icons
  <https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons.html>

Cisco's icons are generally available for use in non-commercial, technical
and educational materials such as diagrams, but redistribution in a software
project may require additional permission. When adding official Cisco icons:

1. Read the current terms on the page linked above.
2. Keep the icons unmodified (other than recoloring) and attribute them to
   Cisco in this file.
3. Place the files under `public/stencils/cisco-official/` so the origin is
   visually obvious in the tree.
4. Update `src/lib/stencils/manifest.ts` to reference the new paths.

Trademarks such as "Cisco" are property of their respective owners. Use in
NetWeave does not imply endorsement.
