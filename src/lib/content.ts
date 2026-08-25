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
    slug: "on-building-software-that-lasts",
    title: "On Building Software That Lasts",
    date: "Aug 2026",
    read: "5 min read",
    body: [
      "## The Illusion of Rapid Execution",
      "When you first start building web applications and backend systems, the temptation is always to ship features at breakneck speed. You stitch together libraries, copy-paste patterns, and rely on abstractions to get a working prototype onto the screen. For hackathons or personal demos, this approach works. But as soon as real users rely on your application, every shortcut comes back as technical debt.",
      "Building software that lasts requires slowing down just enough to understand what happens under the hood. It means asking fundamental questions: What happens when the network drops? How does this state sync across clients on low-bandwidth mobile connections? Are our database queries indexed, or will latency spike the moment we hit ten thousand rows?",
      "## Determinism Over Magic",
      "In my own work—whether engineering MediBot's multi-stage medical RAG pipeline or real-time WebSocket sync in Sketch.io—I've learned that deterministic behavior is the single most important property of reliable software. When an API returns a result, or when a collaborative whiteboard stroke is rendered, it should behave predictably under all conditions.",
      "Relying on 'magic' frameworks or un-audited code generators leads to fragile systems. When an edge case breaks, you end up patching symptoms instead of resolving root causes. True engineering discipline means embracing strict type safety, zero-trust input validation, and explicit error boundaries so your software degrades gracefully rather than crashing silently.",
      "## Interface Craft & Respecting User Time",
      "Software craft isn't just about backend architecture—it extends directly to the user interface. An interface that responds instantly to user input, uses harmonious typography, and avoids intrusive layout shifts communicates respect for the user's focus.",
      "When you combine clean, well-tested backend logic with a minimalist, high-signal user experience, you create software that feels timeless. As tools and frameworks continue to evolve, the foundational principles of clarity, performance, and craftsmanship remain unchanged.",
    ],
  },
  {
    slug: "developers-relationship-with-ai",
    title: "The Developer's Relationship with Artificial Intelligence",
    date: "Jun 2026",
    read: "6 min read",
    body: [
      "## Beyond the Hype: AI as a Thought Partner",
      "Over the past few years, artificial intelligence has shifted from a specialized research domain into a daily developer tool. Headlines alternate between claiming AI will write all code by tomorrow and declaring it a overhyped bubble. The reality experienced by working software engineers lies somewhere in between.",
      "AI models—specifically modern large language models—are extraordinary pattern completers. They can scaffold boilerplate in seconds, summarize dense documentation, and generate initial test matrices. But treating an LLM as an autonomous decision-maker is a mistake. An AI model has no concept of memory constraints, production edge cases, or domain-specific security compliance unless explicitly guided by human expertise.",
      "## Lessons From Building Medical RAG & AI Agents",
      "While building MediBot (a domain-specific RAG system for medical documents) and the AI Checkout Recovery Agent, I saw firsthand where LLMs shine and where they fail. In naive RAG setups, vector similarity often retrieves semantically adjacent content that is factually incorrect—a catastrophic flaw when dealing with clinical guidelines.",
      "To solve this, we had to layer strict engineering controls over the model: hybrid dense-sparse retrieval, cross-encoder reranking, and hard Pydantic schema validation. The AI didn't solve the problem on its own; robust software engineering made the AI reliable.",
      "## Why Engineering Discipline Matters More Than Ever",
      "As automated code generation accelerates, the bottleneck in software development shifts from typing syntax to reading, auditing, and reasoning about complex distributed systems. A developer who doesn't understand memory lifecycles, network protocols, or database locking mechanisms won't be able to evaluate whether generated code is secure or efficient.",
      "Rather than making developers obsolete, AI elevates the importance of core computer science fundamentals. The engineers who thrive will be those who combine deep technical discipline with the ability to orchestrate AI tools effectively—keeping human intent, system safety, and user privacy at the center of every project.",
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
    slug: "prism-light-weaver",
    title: "Prism Light Weaver",
    date: "Aug 2026",
    note: "Interactive optical glass prism simulation with chromatic dispersion, spectral refraction, and crystal Web Audio synthesis.",
    cover: craft1,
  },
  {
    slug: "gravitational-vortex",
    title: "Gravitational Particle Vortex",
    date: "May 2026",
    note: "An interactive N-body kinetic particle gravity simulation with orbital shockwaves, cursor singularity pull, and cosmic sub-bass resonance.",
    cover: craft2,
  },
];
