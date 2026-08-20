import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  cover: string;
  summary: string;
  role: string;
  stack: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "atlas-metrics",
    title: "Atlas",
    kind: "Analytics Platform",
    year: "2026",
    cover: work1,
    summary:
      "A product analytics surface that turns raw event streams into a calm, readable picture of how a product is actually used.",
    role: "Lead engineer",
    stack: ["TypeScript", "React", "ClickHouse", "Go"],
    body: [
      "Atlas started as an internal tool for a team drowning in dashboards nobody trusted. The brief was blunt: fewer charts, more answers.",
      "I designed the query layer around pre-aggregated rollups so the median dashboard load dropped from 4.1s to under 300ms, then rebuilt the front end around a single composable chart primitive instead of a dozen bespoke widgets.",
      "The most satisfying part was the empty state work — teaching the product to explain itself before any data exists.",
    ],
  },
  {
    slug: "kernel-cli",
    title: "Kernel",
    kind: "Developer Tooling",
    year: "2025",
    cover: work2,
    summary:
      "A local-first CLI and daemon that keeps distributed dev environments reproducible without a container tax.",
    role: "Systems engineer",
    stack: ["Rust", "gRPC", "Nix"],
    body: [
      "Kernel replaced a fragile pile of shell scripts with one binary that snapshots dependency graphs and restores them deterministically.",
      "I wrote the diffing engine and the incremental restore path, which cut cold environment setup from twenty minutes to about ninety seconds.",
      "Ergonomics mattered more than features here: every command had to be guessable, and every failure had to say what to do next.",
    ],
  },
  {
    slug: "cadence",
    title: "Cadence",
    kind: "Audio Web App",
    year: "2025",
    cover: work3,
    summary:
      "A browser music player built on the Web Audio API, with gapless playback and a waveform scrubber that feels physical.",
    role: "Solo build",
    stack: ["Web Audio API", "React", "Canvas"],
    body: [
      "Cadence is where the sound design on this site came from. I wanted to understand how much expressiveness you can get out of an oscillator and a gain node.",
      "Waveforms are decoded off the main thread and painted to canvas at device pixel ratio, so scrubbing stays at 60fps on a five-year-old laptop.",
      "Every control has a tuned interaction sound — quiet enough to notice only once.",
    ],
  },
  {
    slug: "ledger-docs",
    title: "Ledger",
    kind: "Documentation System",
    year: "2024",
    cover: work4,
    summary:
      "A typography-first documentation platform with versioned content, instant search, and generated API references.",
    role: "Frontend engineer",
    stack: ["MDX", "TypeScript", "Algolia"],
    body: [
      "Ledger treats docs as a product surface, not an afterthought. The reading column, line length, and vertical rhythm were set before a single component was written.",
      "I built the content pipeline that compiles MDX with typed frontmatter and a table of contents that tracks scroll position without jitter.",
      "Search results render inline as you type, and the whole site ships under 90KB of JavaScript.",
    ],
  },
];

export type Note = {
  slug: string;
  title: string;
  date: string;
  read: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "sound-as-interface",
    title: "Sound as an interface layer",
    date: "Jul 2026",
    read: "6 min read",
    body: [
      "Most interfaces are silent, and mostly that's correct. But silence is a default, not a decision — and defaults are worth interrogating.",
      "A synthesized click at 660Hz costs nothing to ship, never buffers, and can be tuned per interaction. The trick is restraint: if the user notices the sound, it's too loud.",
    ],
  },
  {
    slug: "latency-is-a-design-material",
    title: "Latency is a design material",
    date: "Apr 2026",
    read: "8 min read",
    body: [
      "You can't design your way out of a 3 second query, but you can design the wait so it doesn't feel like abandonment.",
      "Optimistic state, skeleton geometry that matches the real layout, and honest progress are three cheap tools most teams skip.",
    ],
  },
  {
    slug: "small-primitives",
    title: "Ship small primitives, not big components",
    date: "Dec 2025",
    read: "5 min read",
    body: [
      "Every large component starts as a small one with a good API and ends as a config object with nineteen booleans.",
      "The escape hatch is composition — expose the parts, let the product assemble them.",
    ],
  },
  {
    slug: "reading-the-stack-trace",
    title: "Actually reading the stack trace",
    date: "Sep 2025",
    read: "4 min read",
    body: [
      "The fastest debugging technique I know is embarrassingly simple: read the whole error, out loud, before touching anything.",
      "Half the time the answer is on line three.",
    ],
  },
];

export type CraftItem = {
  slug: string;
  title: string;
  date: string;
  note: string;
};

export const craft: CraftItem[] = [
  { slug: "spring-toggle", title: "Spring Toggle", date: "Jun 2026", note: "A switch with mass." },
  {
    slug: "waveform-scrubber",
    title: "Waveform Scrubber",
    date: "Mar 2026",
    note: "Canvas scrubbing at 60fps.",
  },
  {
    slug: "magnetic-cursor",
    title: "Magnetic Cursor",
    date: "Jan 2026",
    note: "Buttons that lean toward you.",
  },
  {
    slug: "elastic-tabs",
    title: "Elastic Tabs",
    date: "Nov 2025",
    note: "Shared-layout tab indicator.",
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    date: "Aug 2025",
    note: "Fuzzy search, zero deps.",
  },
  { slug: "tooltip-rail", title: "Tooltip Rail", date: "May 2025", note: "One tooltip, many hosts." },
];
