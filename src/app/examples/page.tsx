import Link from 'next/link';
import { Header } from '@/components/Layout/Header';

type Example = {
  file: string;
  title: string;
  summary: string;
  format: 'NetWeave v1' | 'ContainerLab';
};

const EXAMPLES: Example[] = [
  {
    file: '01-two-router-ospf.yaml',
    title: 'Two-router OSPF',
    summary: 'Minimal backbone — two routers peering in OSPF area 0. A good first read.',
    format: 'NetWeave v1',
  },
  {
    file: '02-spine-leaf-bgp-evpn.yaml',
    title: 'Spine/Leaf eBGP underlay',
    summary: '2 spines × 3 leaves fabric with per-leaf AS numbers and point-to-point /31s.',
    format: 'NetWeave v1',
  },
  {
    file: '03-dmz-firewall-sandwich.yaml',
    title: 'DMZ firewall sandwich',
    summary: 'Outside → fw-out → DMZ switch → fw-in → inside. Highlights trunks and SVIs.',
    format: 'NetWeave v1',
  },
  {
    file: '04-campus-l2-l3-svi.yaml',
    title: 'Campus L2/L3 with SVI gateways',
    summary: 'Collapsed-core + L2 access uplinks. Shows LACP, SVI, AP and WLC icons.',
    format: 'NetWeave v1',
  },
  {
    file: '05-lb-web-tier.yaml',
    title: 'Load balancer in front of a web tier',
    summary: 'LB VIP + backend VLAN + three web servers. Minimal L2 fan-out.',
    format: 'NetWeave v1',
  },
  {
    file: '06-containerlab-srlinux.clab.yaml',
    title: 'ContainerLab — SR Linux + clients',
    summary: 'Two Nokia SR Linux nodes back-to-back with two Alpine clients.',
    format: 'ContainerLab',
  },
  {
    file: '07-containerlab-ceos-mixed.clab.yaml',
    title: 'ContainerLab — cEOS + vSRX fabric',
    summary: 'Mixed-vendor fabric: Arista cEOS spines/leaves with a Juniper vSRX firewall.',
    format: 'ContainerLab',
  },
];

export default function ExamplesPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 overflow-auto px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Examples</h1>
        <p className="mt-1 text-sm muted max-w-2xl">
          Seven starter topologies that exercise every feature — device types, interface kinds,
          OSPF/IS-IS/BGP overlays and both supported input formats. Paste any of them into the
          editor on the home page and hit render.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {EXAMPLES.map((e) => (
            <article
              key={e.file}
              className="panel rounded-xl p-4 shadow-card transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{e.title}</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-800 dark:bg-brand-900/40 dark:text-brand-100">
                  {e.format}
                </span>
              </div>
              <p className="mt-1 text-xs muted">{e.summary}</p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <a
                  className="rounded-md border border-[rgb(var(--border))] px-2 py-1 hover:bg-[rgb(var(--border))]"
                  href={`${base}/examples/${e.file}`}
                  download
                >
                  Download YAML
                </a>
                <a
                  className="rounded-md border border-[rgb(var(--border))] px-2 py-1 hover:bg-[rgb(var(--border))]"
                  href={`${base}/examples/${e.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View raw
                </a>
                <Link
                  className="ml-auto rounded-md bg-brand-500 px-2 py-1 text-white hover:bg-brand-600"
                  href={`/?example=${encodeURIComponent(e.file)}`}
                >
                  Open in editor →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
