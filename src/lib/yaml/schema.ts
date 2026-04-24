import { z } from 'zod';

/* ----------------------------------------------------------------------------
 * NetWeave native schema (v1)
 * -------------------------------------------------------------------------- */

export const DeviceType = z.enum([
  'l2-switch',
  'l3-switch',
  'router',
  'firewall',
  'load-balancer',
  'server',
  'ap',
  'wlc',
]);
export type DeviceType = z.infer<typeof DeviceType>;

export const InterfaceKind = z.enum([
  'l2',
  'l3',
  'lacp',
  'trunk',
  'access',
  'svi',
  'loopback',
  'subif',
]);
export type InterfaceKind = z.infer<typeof InterfaceKind>;

export const LinkType = z.enum(['l2', 'l3', 'lacp', 'trunk', 'access']);
export type LinkType = z.infer<typeof LinkType>;

export const Interface = z.object({
  name: z.string().min(1),
  kind: InterfaceKind,
  ipv4: z.string().optional(),
  ipv6: z.string().optional(),
  members: z.array(z.string()).optional(),
  description: z.string().optional(),
  vlan: z.number().int().optional(),
});
export type Interface = z.infer<typeof Interface>;

export const OspfArea = z.object({
  id: z.union([z.number().int(), z.string()]),
  interfaces: z.array(z.string()).optional(),
});

export const OspfConfig = z.object({
  process: z.number().int().optional(),
  router_id: z.string().optional(),
  areas: z.array(OspfArea).optional(),
});

export const IsisConfig = z.object({
  net: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const BgpNeighbor = z.object({
  peer: z.string(),
  remote_as: z.number().int(),
  description: z.string().optional(),
});

export const BgpConfig = z.object({
  asn: z.number().int(),
  router_id: z.string().optional(),
  neighbors: z.array(BgpNeighbor).optional(),
});

export const Protocols = z.object({
  ospf: OspfConfig.optional(),
  isis: IsisConfig.optional(),
  bgp: BgpConfig.optional(),
});

export const Device = z.object({
  hostname: z.string().min(1),
  type: DeviceType,
  role: z.string().optional(),
  site: z.string().optional(),
  interfaces: z.array(Interface).default([]),
  protocols: Protocols.optional(),
});
export type Device = z.infer<typeof Device>;

export const LinkEndpoint = z.object({
  device: z.string().min(1),
  interface: z.string().min(1),
});

export const Link = z.object({
  a: LinkEndpoint,
  b: LinkEndpoint,
  type: LinkType.default('l3'),
  description: z.string().optional(),
});
export type Link = z.infer<typeof Link>;

export const Requester = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const Metadata = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  requester: Requester.optional(),
});

export const NetWeaveTopology = z.object({
  apiVersion: z.literal('netweave.io/v1'),
  kind: z.literal('Topology'),
  metadata: Metadata,
  devices: z.array(Device),
  links: z.array(Link).default([]),
});
export type NetWeaveTopology = z.infer<typeof NetWeaveTopology>;

/* ----------------------------------------------------------------------------
 * ContainerLab schema (permissive — we only read what we need to render)
 * -------------------------------------------------------------------------- */

export const ContainerLabNode = z.object({
  kind: z.string().optional(),
  image: z.string().optional(),
  group: z.string().optional(),
  mgmt_ipv4: z.string().optional(),
  mgmt_ipv6: z.string().optional(),
  labels: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export const ContainerLabLink = z.object({
  endpoints: z.array(z.string()).length(2),
});

export const ContainerLabTopology = z.object({
  name: z.string().optional(),
  topology: z.object({
    kinds: z.record(z.string(), z.any()).optional(),
    defaults: z.record(z.string(), z.any()).optional(),
    nodes: z.record(z.string(), ContainerLabNode),
    links: z.array(ContainerLabLink).default([]),
  }),
});
export type ContainerLabTopology = z.infer<typeof ContainerLabTopology>;

/* ----------------------------------------------------------------------------
 * Normalised internal model consumed by the rest of the app.
 * -------------------------------------------------------------------------- */

export type NormalizedInterface = {
  name: string;
  kind: InterfaceKind;
  ipv4?: string;
  ipv6?: string;
  members?: string[];
  description?: string;
  vlan?: number;
};

export type NormalizedDevice = {
  hostname: string;
  type: DeviceType;
  role?: string;
  interfaces: NormalizedInterface[];
  protocols?: z.infer<typeof Protocols>;
};

export type NormalizedLink = {
  a: { device: string; interface: string };
  b: { device: string; interface: string };
  type: LinkType;
  description?: string;
};

export type NormalizedTopology = {
  source: 'netweave' | 'containerlab';
  metadata: {
    name: string;
    description?: string;
    requester?: { name?: string; email?: string };
  };
  devices: NormalizedDevice[];
  links: NormalizedLink[];
};
