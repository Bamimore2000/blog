// data/blogs.ts
import { BlogCardProps } from "@/components/blog-card";

export const blogPosts: BlogCardProps[] = [
  {
    title: "Elite Pacts vs. Popular Inclusion: Sequencing Political Settlements in New States",
    description:
      "Should new or fragile states prioritise narrow elite bargains or broad participatory processes? Historical and contemporary evidence on sequencing and trade-offs.",
    date: "Oct 25, 2025",
    readTime: "12 min read",
    tags: ["elite pacts", "political settlements", "democratisation"],
    slug: "elite-pacts-vs-popular-inclusion",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=750&fit=crop",
    content: `
      <p>Stable elite agreements often precede inclusive institutions by decades (Britain, Botswana, South Korea).</p>
      <p>Forcing inclusion too early can fracture the minimal coalition needed for basic order.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "Measuring State Capacity in Real Time: New Indices for 2025",
    description:
      "Traditional metrics lag by years. New satellite, mobile money, and administrative data allow near-real-time assessment of state reach and effectiveness.",
    date: "Oct 18, 2025",
    readTime: "8 min read",
    tags: ["state capacity", "measurement", "data revolution"],
    slug: "measuring-state-capacity-real-time-2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop", // data visualisation
    content: `
      <p>Night lights, tax compliance scraped from mobile payments, and civil registration coverage now update monthly.</p>
      <p>These tools transform both academic research and policy timing in fragile environments.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "From Failed State to Middle-Income in One Generation: The Rwanda Paradox",
    description:
      "Rigorous analysis of Rwanda’s state-building trajectory since 1994 — achievements, trade-offs, and lessons for coercive developmentalism.",
    date: "Oct 12, 2025",
    readTime: "15 min read",
    tags: ["rwanda", "authoritarian modernisation", "developmental state"],
    slug: "rwanda-state-building-paradox",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&h=750&fit=crop", // Kigali skyline
    content: `
      <p>Rwanda combined extreme central control with performance-based legitimacy and massive investment in bureaucratic capability.</p>
      <p>The result is one of the fastest state-building episodes in modern history — at the cost of political competition.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "Institution-Building in Post-Conflict States: Lessons from 1945–2025",
    description:
      "Eighty years of state reconstruction reveal recurring patterns in fiscal capacity, rule of law, and elite bargaining. What actually works — and what repeatedly fails.",
    date: "Dec 4, 2025",
    readTime: "14 min read",
    tags: ["state-building", "post-conflict", "institutions", "history"],
    slug: "institution-building-post-conflict-1945-2025",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop", // archival documents
    content: `
      <p>From Germany and Japan in 1945 to Afghanistan and Iraq two decades ago, external and domestic actors have attempted to build functioning states on the ruins of war.</p>
      <p>This long-form essay examines which institutional designs endured, why fiscal contracts mattered more than constitutions, and how elite settlements — not elections — determined success.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "The Fiscal Foundations of Durable States: Evidence from 1800–2025",
    description:
      "Modern state capacity rests on the ability to tax. A new dataset covering two centuries shows how direct taxation, bureaucratic professionalisation, and war shaped resilient states.",
    date: "Nov 28, 2025",
    readTime: "12 min read",
    tags: ["fiscal state", "taxation", "state capacity", "history"],
    slug: "fiscal-foundations-durable-states",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop", // old ledgers
    content: `
      <p>States that successfully shifted from indirect to broad-based direct taxation between 1850 and 1920 still dominate global rankings of governance quality today.</p>
      <p>Using new historical revenue data, we trace the causal pathways from fiscal innovation to administrative capacity and political stability.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "Why Decentralisation Fails in Fragile States (And How to Make It Work)",
    description:
      "Decentralisation is prescribed in almost every peace agreement — yet it frequently accelerates state collapse. New comparative evidence from Africa and Southeast Asia.",
    date: "Nov 20, 2025",
    readTime: "11 min read",
    tags: ["decentralisation", "fragile states", "federalism"],
    slug: "why-decentralisation-fails-fragile-states",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop", // regional government building
    content: `
      <p>Premature fiscal and political decentralisation without central extractive capacity creates perverse incentives for local predation.</p>
      <p>Case studies from Somalia, Myanmar, and DR Congo show when — and how — sequenced decentralisation can instead reinforce state cohesion.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "State-Making at the Periphery: Borders, Identity, and Coercion in the 21st Century",
    description:
      "The classic European story of state formation through war no longer applies. Today’s state-making happens at the margins relies on surveillance, identity registration, and soft coercion.",
    date: "Nov 15, 2025",
    readTime: "10 min read",
    tags: ["borders", "identity", "surveillance", "periphery"],
    slug: "state-making-periphery-21st-century",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=750&fit=crop", // biometric registration
    content: `
      <p>From India’s Aadhaar to Ethiopia’s kebele system, modern states extend legibility and control through digital registration rather than conscription and cadastral surveys.</p>
      <p>This shift changes both the technology and the politics of state penetration.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "The Return of Industrial Policy: State-Led Development After Neoliberalism",
    description:
      "From South Korea in the 1960s to China and now Rwanda and Bangladesh — coordinated industrial policy is back. What contemporary state-builders can learn from historical success.",
    date: "Nov 10, 2025",
    readTime: "13 min read",
    tags: ["industrial policy", "developmental state", "economic transformation"],
    slug: "return-of-industrial-policy-2025",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=750&fit=crop", // factory + flag
    content: `
      <p>Effective industrial policy requires embedded autonomy, performance legitimacy, and reciprocal control mechanisms.</p>
      <p>Contemporary cases show these classic insights remain relevant — if adapted to global value chains and democratic scrutiny.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "Security Sector Reform That Actually Works: Evidence from 30 Cases",
    description:
      "Most SSR programmes fail to reduce violence or build accountable forces. A new synthesis identifies the rare conditions under which reform succeeds.",
    date: "Nov 5, 2025",
    readTime: "9 min read",
    tags: ["security sector reform", "civil-military", "peacebuilding"],
    slug: "security-sector-reform-that-works",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop",
    content: `
      <p>Successful reform requires unified political authority, external conditionality tied to domestic coalitions, and gradual integration rather than rapid demobilisation.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
  {
    title: "Digital Infrastructure as State-Building: The Case of Estonia and Beyond",
    description:
      "How a small post-Soviet state used e-governance and digital identity to leapfrog institutional development — and what larger, older states can copy.",
    date: "Oct 30, 2025",
    readTime: "10 min read",
    tags: ["digital state", "e-governance", "estonia"],
    slug: "digital-infrastructure-state-building-estonia",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop",
    content: `
      <p>Estonia’s X-Road, digital ID card, and e-residency programme created trust in public institutions where almost none existed in 1991.</p>
      <p>The model is now being adapted in fragile and developing states with surprising results.</p>
    `,
    author: {
      name: "Dr. Sarah Kimani",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      id: "author-003",
    },
  },
 
];