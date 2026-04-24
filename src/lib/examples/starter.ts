export const STARTER_YAML = `apiVersion: netweave.io/v1
kind: Topology
metadata:
  name: two-router-ospf
  requester:
    name: "Jane Doe"
    email: "jane@corp.net"
devices:
  - hostname: r1
    type: router
    interfaces:
      - { name: Lo0, kind: loopback, ipv4: 10.0.0.1/32 }
      - { name: Gi0/0, kind: l3, ipv4: 192.0.2.1/30 }
    protocols:
      ospf:
        process: 1
        router_id: 10.0.0.1
        areas:
          - { id: 0, interfaces: [Lo0, Gi0/0] }
  - hostname: r2
    type: router
    interfaces:
      - { name: Lo0, kind: loopback, ipv4: 10.0.0.2/32 }
      - { name: Gi0/0, kind: l3, ipv4: 192.0.2.2/30 }
    protocols:
      ospf:
        process: 1
        router_id: 10.0.0.2
        areas:
          - { id: 0, interfaces: [Lo0, Gi0/0] }
links:
  - a: { device: r1, interface: Gi0/0 }
    b: { device: r2, interface: Gi0/0 }
    type: l3
`;
