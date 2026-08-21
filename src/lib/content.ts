import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/flux.jpg";
import work6 from "@/assets/checkout.png";

import craft1 from "@/assets/craft-1.jpg";
import craft2 from "@/assets/craft-2.jpg";
import craft3 from "@/assets/craft-3.jpg";
import craft4 from "@/assets/craft-4.jpg";
import craft5 from "@/assets/craft-5.jpg";

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
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "medibot",
    title: "MediBot",
    kind: "Medical RAG Architecture",
    year: "2026",
    cover: work1,
    summary:
      "A domain-specific Medical RAG system that extends the standard RAG pipeline with document filtering, privacy protection, multi-stage retrieval, and hallucination prevention.",
    role: "Architect & Lead Developer",
    stack: ["Python", "FastAPI", "Pinecone", "Hugging Face", "Gemini API"],
    githubUrl: "https://github.com/hitendra-3/medicalAssistant",
    body: [
      "## Phase 1: Ingestion Pipeline",
      "MediBot is a domain-specific Medical RAG system. It allows users to upload medical PDFs and query clinical content in natural language.",
      "The Ingestion Pipeline runs once when a document is uploaded. It filters non-medical uploads using zero-shot classification, scrubs PII, segments text into overlapping chunks, and stores dense vector embeddings inside Pinecone.",
      "## Phase 2: Inference Pipeline",
      "The Inference Pipeline triggers every time a question is asked. Instead of querying the LLM directly, we find relevant document data first.",
      "The system transforms user queries, performs a hybrid dense-sparse search, and reranks retrieval results using a Cross-Encoder. The LLM (Gemini) generates responses backed strictly by this retrieved context to prevent hallucination.",
    ],
  },
  {
    slug: "sketch-io",
    title: "Sketch.io",
    kind: "Collaborative Whiteboard",
    year: "2025",
    cover: work2,
    summary:
      "A low-latency collaborative whiteboard synchronizing drawing strokes, cursor coordinates, and active room states across clients in real-time.",
    role: "Full-Stack Engineer",
    stack: ["Node.js", "Express", "React", "WebSockets", "HTML5 Canvas"],
    githubUrl: "https://github.com/hitendra-3/Sketch.io",
    body: [
      "## Phase 1: Real-time Drawing Sync",
      "Sketch.io is a collaborative canvas designed for real-time stroke and cursor synchronization with a latency threshold of sub-50ms.",
      "## Phase 2: WebSocket Gateway",
      "The system is built on a Node.js and Express backend, routing updates through WebSockets. To support drawing across different client screens, it normalizes coordinates and interpolates lines for smooth paths.",
      "## Phase 3: Presence & Storage Cache",
      "The layout runs on Redis for active user presence and express pub/sub coordination, coupled with PostgreSQL for persistent room state backup, ensuring safe room recovery on reconnect.",
    ],
  },
  {
    slug: "qa-test-generator",
    title: "AI-Powered QA Generator",
    kind: "QA Automation Platform",
    year: "2025",
    cover: work3,
    summary:
      "A FastAPI backend that parses versioned Markdown manuals into tree structures, generates structured QA test cases with Gemini, and tracks staleness via content hashes.",
    role: "Backend & Systems Engineer",
    stack: ["FastAPI", "SQLite", "MongoDB Atlas", "Gemini 2.5 Flash", "Pydantic"],
    githubUrl: "https://github.com/hitendra-3/TRI9T",
    body: [
      "## Phase 1: Markdown Parsing",
      "The AI-Powered QA Generator ingests manual updates line-by-line. A stack-based parser builds a hierarchical parent-child tree from markdown headers, storing structure inside SQLite.",
      "## Phase 2: AI Test Generation",
      "Using Google Gemini 2.5 Flash, the system acts as a QA Engineer to generate structured test cases (Title, Preconditions, Steps, Expected Results, Priority). Generated outputs are stored in MongoDB Atlas.",
      "## Phase 3: Staleness Detection",
      "Revision changes are detected using SHA-256 content hashes. During retrieval, we compare SQLite node hashes with MongoDB records to automatically tag test cases as Fresh or Stale.",
    ],
  },
  {
    slug: "fluxchat",
    title: "FluxChat Architecture",
    kind: "High-Performance Realtime App",
    year: "2026",
    cover: work5,
    summary:
      "A high-performance communication ecosystem engineered as a study in stateful in-memory backend management and Prism-Light minimalist design psychology.",
    role: "Sole Architect & Designer",
    stack: ["Node.js", "Socket.io", "Next.js 14", "Tailwind CSS", "Supabase", "PostgreSQL"],
    githubUrl: "https://github.com/hitendra-3/FluxChat",
    body: [
      "## Phase 1: Stateful In-Memory Memory Ecosystem",
      "To eliminate database bottleneck latency on high-frequency messages, active chat sectors live entirely within high-speed RAM managed by Node.js and Socket.io WebSocket routers, achieving zero-latency data flow.",
      "## Phase 2: Global Pulse Garbage Collection",
      "Engineered an automated Global Pulse monitor: when connected socket population drops to zero, the server initiates a 60-second evaporation timer. If no client reconnects, the garbage collector purges memory maps safely to prevent memory leaks.",
      "## Phase 3: Prism-Light UX Methodology",
      "Designed a high-contrast executive aesthetic using pearl-glass blurs, 1px precision borders, and an 8px spatial grid, discarding noisy media attachments in favor of pure, high-signal typographic communication.",
    ],
  },
  {
    slug: "ai-checkout-recovery",
    title: "AI Checkout Recovery Agent",
    kind: "Agentic Commerce & AI",
    year: "2026",
    cover: work6,
    summary:
      "A proactive, minimal-intervention AI agent designed to rescue abandoned e-commerce carts by detecting user friction at the exact moment of checkout using Google Gemini 2.5 Flash.",
    role: "Frontend & Integration Lead",
    stack: ["React 18", "Vite", "Node.js", "Express", "Google Gemini 2.5 Flash", "Tailwind CSS"],
    githubUrl: "https://github.com/hitendra-3/AI-Checkout-Recovery-Agent",
    body: [
      "## Phase 1: Real-Time Friction Monitoring",
      "Abandoned carts exceed 70% in modern e-commerce due to static discounts and reactive email triggers. The agent monitors user intent in real-time, detecting price hesitation, shipping thresholds (e.g., ≤ ₹300 gap to free shipping), and idle states (>20s inactivity).",
      "## Phase 2: Decision Matrix & Context Aggregator",
      "The Node.js Express backend aggregates cart state, user browsing history, and active promotional policies into a structured payload for Google Gemini 2.5 Flash. The model evaluates strategy dynamically: offering targeted add-ons, clarifying return policies, or reinforcing product value.",
      "## Phase 3: Robust Parsing & Voice Input",
      "Includes a custom JSON Salvage Parser to rescue truncated AI responses and ensure 100% system stability. Integrated Web Speech API enables hands-free voice query dictation directly on the checkout canvas.",
    ],
  },
];

export type Note = {
  slug: string;
  title: string;
  date: string;
  read: string;
  mediumUrl?: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "basic-pentesting-1",
    title: "Basic Pentesting - 1 Walkthrough (VulnHub)",
    date: "Feb 2024",
    read: "6 min read",
    mediumUrl: "https://medium.com/@shitendra-3/basic-pentesting-1-walkthrough-vulnhub-4fa0536df139",
    body: [
      "## Overview",
      "A complete step-by-step penetration testing walkthrough on the Basic Pentesting: 1 VulnHub machine created by Josiah Pierce. This lab covers remote service scanning, WordPress vulnerability enumeration, Metasploit exploitation, and privilege escalation via writable file permissions.",
      "## Reconnaissance & Service Discovery",
      "We started by scanning the target host (10.0.2.4) using Nmap: `nmap -A -sV -P -T4 10.0.2.4`. The scan revealed three open ports: FTP (ProFTPD 1.3.3c on port 21), SSH (OpenSSH 7.2p2 on port 22), and HTTP (Apache httpd 2.4.18 on port 80). Directory enumeration with dirb uncovered a hidden path `/secret/` leading to a WordPress site.",
      "## WordPress Exploitation & Shell Access",
      "Using wpscan, we enumerated the site users and identified the default 'admin' account. Navigating to the wp-login.php panel and testing default credentials granted immediate admin access. From there, we launched Metasploit's `wp_admin_shell_upload` module to upload a payload and trigger a reverse Meterpreter shell as the www-data user.",
      "## Privilege Escalation to Root",
      "After spawning an interactive TTY bash shell with `python -c 'import pty;pty.spawn(\"/bin/bash\")'`, we inspected system permissions and discovered that `/etc/passwd` had world read-write permissions. We downloaded `/etc/passwd`, generated an encrypted password hash using `openssl passwd -1 hello`, replaced the root password hash in the local file, and uploaded it back to the target. Authenticating with `su root` gave us full root privilege access!",
    ],
  },
  {
    slug: "llm-reliability",
    title: "Designing for LLM Reliability in Production",
    date: "Aug 2026",
    read: "3 min read",
    body: [
      "## Naive RAG vs Production Pipelines",
      "Naive RAG works great in local demos but breaks in production when domain accuracy matters. Vector similarity measures semantic orientation, not factual correctness—a query about pediatric dosage can easily retrieve adult dosage chunks if not properly filtered.",
      "## Hybrid Search & Schema Control",
      "In MediBot, we combine dense vector embeddings with sparse BM25 keyword search, reranking results through a Cross-Encoder to eliminate noise. We enforce strict Pydantic JSON schemas on model responses so every output is deterministic and fully verifiable.",
    ],
  },
  {
    slug: "realtime-synced-canvas",
    title: "Under the Hood of a Real-Time Synced Canvas",
    date: "May 2026",
    read: "3 min read",
    body: [
      "## Viewport-Independent Coordinate Normalization",
      "Building a collaborative canvas like Sketch.io requires normalizing drawing points between 0 and 1 relative to viewport dimensions so a stroke drawn on a 4K display renders identically on mobile screens.",
      "## Delta Encoding & Bezier Smoothing",
      "Instead of piping full stroke arrays over WebSockets at 60 FPS, we send compact binary deltas every 20ms. The renderer applies quadratic Bezier curve interpolation to anchor points, producing fluid, buttery smooth brush strokes under 50ms latency.",
    ],
  },
  {
    slug: "zerotrust-backend",
    title: "Vulnerability Assessments for Backend Engineers",
    date: "Feb 2026",
    read: "3 min read",
    body: [
      "## Thinking Like the Exploit Scanner",
      "Security shouldn't be a pre-launch checklist. Automated vulnerability scanners probe input boundaries, test state transitions, and exploit un-sanitized parameters with cold efficiency.",
      "## Enforcing Zero-Trust Boundaries",
      "Every API entry point and internal service boundary must enforce strict length limits, input sanitization, and cryptographically verified JWT tokens so compromised endpoints can't escalate privileges across microservices.",
    ],
  },
  {
    slug: "fastapi-maintainability",
    title: "FastAPI: Speed vs. Maintainability at Scale",
    date: "Oct 2025",
    read: "2 min read",
    body: [
      "## Dependency Injection & Domain Isolation",
      "FastAPI's built-in Depends system keeps endpoints clean by decoupling database session lifecycles and authentication logic from router handlers.",
      "## Pydantic Schemas & Async I/O",
      "Separating request DTOs from database models prevents unintentional ORM side effects. Paired with native async database drivers (asyncpg/SQLAlchemy 2.0), API endpoints maintain high concurrency without blocking the asyncio loop.",
    ],
  },
];

export type CraftItem = {
  slug: string;
  title: string;
  date: string;
  note: string;
  cover: string;
};

export const craft: CraftItem[] = [
  {
    slug: "node-plucker",
    title: "Node Plucker",
    date: "Jun 2026",
    note: "5-string kinetic harp with spring physics, glowing particles, and pentatonic synthesis.",
    cover: craft1,
  },
  {
    slug: "gravitational-vortex",
    title: "Gravitational Particle Vortex",
    date: "May 2026",
    note: "An interactive N-body kinetic particle gravity simulation with orbital shockwaves, cursor singularity pull, and cosmic sub-bass resonance.",
    cover: craft2,
  },
  {
    slug: "acoustic-waveform",
    title: "Acoustic Wave Matrix",
    date: "Mar 2026",
    note: "Multi-channel frequency visualizer canvas with coordinate FM audio synthesis and visual wave distortion.",
    cover: craft3,
  },
  {
    slug: "kinetic-compass",
    title: "Kinetic Compass Engine",
    date: "Jan 2026",
    note: "A tactile magnetic 3D compass dial with cardinal orientation indicators, smooth inertia physics, and acoustic pitch ticks.",
    cover: craft4,
  },
  {
    slug: "pixel-rain",
    title: "Pixel Rain",
    date: "Nov 2025",
    note: "Interactive matrix rain with cursor-directed column bursts, glitch trails, and ambient synth tones.",
    cover: craft5,
  },
];
