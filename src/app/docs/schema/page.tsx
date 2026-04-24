import { Header } from '@/components/Layout/Header';

export default function SchemaPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 overflow-auto px-5 py-8 prose-like">
        <h1 className="text-2xl font-semibold tracking-tight">NetWeave v1 schema</h1>
        <p className="mt-2 text-sm muted">
          The native schema is intentionally small: metadata, devices with interfaces and optional
          protocol config, and links that reference devices by hostname and interfaces by name.
        </p>

        <h2 className="mt-6 text-lg font-semibold">Top-level document</h2>
        <Block>{`apiVersion: netweave.io/v1   # required
kind: Topology               # required
metadata: { ... }            # required, see below
devices: [ ... ]             # required, at least one device recommended
links: [ ... ]               # optional, defaults to []
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">metadata</h2>
        <Block>{`metadata:
  name: "campus-core"               # required
  description: "Short summary."     # optional
  requester:                        # optional — used in export metadata
    name: "Jane Doe"
    email: "jane@corp.net"
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">devices[]</h2>
        <p className="mt-1 text-sm muted">
          <code>type</code> must be one of: <code>l2-switch</code>, <code>l3-switch</code>,{' '}
          <code>router</code>, <code>firewall</code>, <code>load-balancer</code>,{' '}
          <code>server</code>, <code>ap</code>, <code>wlc</code>.
        </p>
        <Block>{`- hostname: core-01           # required, unique within the doc
  type: l3-switch            # required
  role: "spine"              # optional — free-form label (shown on the node)
  site: "dc-east"            # optional
  interfaces: [ ... ]        # see below
  protocols: { ... }         # optional — ospf / isis / bgp
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">devices[].interfaces[]</h2>
        <p className="mt-1 text-sm muted">
          <code>kind</code> must be one of: <code>l2</code>, <code>l3</code>, <code>lacp</code>,{' '}
          <code>trunk</code>, <code>access</code>, <code>svi</code>, <code>loopback</code>,{' '}
          <code>subif</code>.
        </p>
        <Block>{`interfaces:
  - name: Lo0
    kind: loopback
    ipv4: 10.0.0.1/32
  - name: Vlan10
    kind: svi
    ipv4: 10.10.0.1/24
    vlan: 10
  - name: Po1
    kind: lacp
    members: [Eth1/1, Eth1/2]
  - name: Eth1/3
    kind: l3
    ipv4: 192.0.2.1/30
    ipv6: 2001:db8::1/64
    description: "to core-02"
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">devices[].protocols</h2>
        <Block>{`protocols:
  ospf:
    process: 1
    router_id: 10.0.0.1
    areas:
      - { id: 0, interfaces: [Lo0, Eth1/3] }
  isis:
    net: 49.0001.0100.0000.0001.00
    level: 2
  bgp:
    asn: 65001
    router_id: 10.0.0.1
    neighbors:
      - { peer: 192.0.2.2, remote_as: 65002 }
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">links[]</h2>
        <p className="mt-1 text-sm muted">
          Each link references devices by hostname and interfaces by name. <code>type</code>{' '}
          defaults to <code>l3</code>.
        </p>
        <Block>{`links:
  - a: { device: core-01, interface: Eth1/3 }
    b: { device: edge-01, interface: Eth1/1 }
    type: l3
    description: "north-south"
`}</Block>

        <h2 className="mt-6 text-lg font-semibold">Validation</h2>
        <p className="mt-1 text-sm muted">
          Every field is validated on each keystroke (debounced). Errors surface in a panel under
          the editor and the canvas shows the last good render until the YAML becomes valid again.
        </p>
      </main>
    </div>
  );
}

function Block({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-auto rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-3 text-xs font-mono leading-relaxed">
      {children}
    </pre>
  );
}
