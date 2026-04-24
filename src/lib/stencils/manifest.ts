import type { DeviceType } from '../yaml/schema';

/**
 * Maps every supported device type to a bundled stencil SVG under
 * `public/stencils/netweave/`. To add a new type: drop a square SVG in that
 * directory and add a row here. The DeviceNode component uses Next.js
 * `basePath`-aware pathing so this works both locally and on GitHub Pages.
 */
export const STENCILS: Record<DeviceType, { path: string; label: string }> = {
  'l2-switch':     { path: '/stencils/netweave/l2-switch.svg',     label: 'L2 Switch' },
  'l3-switch':     { path: '/stencils/netweave/l3-switch.svg',     label: 'L3 Switch' },
  'router':        { path: '/stencils/netweave/router.svg',        label: 'Router' },
  'firewall':      { path: '/stencils/netweave/firewall.svg',      label: 'Firewall' },
  'load-balancer': { path: '/stencils/netweave/load-balancer.svg', label: 'Load Balancer' },
  'server':        { path: '/stencils/netweave/server.svg',        label: 'Server' },
  'ap':            { path: '/stencils/netweave/ap.svg',            label: 'Access Point' },
  'wlc':           { path: '/stencils/netweave/wlc.svg',           label: 'Wireless LAN Controller' },
};

/** Returns the public URL for a stencil, respecting `NEXT_PUBLIC_BASE_PATH`. */
export function stencilUrl(type: DeviceType): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${base}${STENCILS[type].path}`;
}
