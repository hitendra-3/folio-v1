import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Github, Linkedin, Mail, FileText, Twitter } from "lucide-react";
import { PageShell, SectionTitle } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CraftCard } from "@/components/site/CraftCard";
import { projects, notes, craft } from "@/lib/content";
import { useSound } from "@/lib/sound";
import cmritLogo from "@/assets/cmrit-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hitendra S — Software Engineer" },
      {
        name: "description",
        content:
          "Software engineer focused on AI applications, backend systems, and real-time interfaces. Selected work, thoughts, and craft.",
      },
      { property: "og:title", content: "Hitendra S — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software engineer focused on AI applications, backend systems, and real-time interfaces.",
      },
    ],
  }),
  component: Index,
});

const links = [
  { label: "Twitter", href: "https://x.com/hitendra_03", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/in/hitendra-s", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/hitendra-3", icon: Github },
  { label: "Mail", href: "mailto:shitendra777@gmail.com", icon: Mail },
  { label: "Résumé", href: "/Resume_V1.pdf", icon: FileText },
];

function Index() {
  const { play } = useSound();
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [hoveredCraft, setHoveredCraft] = useState<string | null>(null);
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const [showCraft, setShowCraft] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);

  return (
    <PageShell>
      {/* Bio Intro Section */}
      <section className="flex flex-col gap-5 text-black/70 dark:text-white/70 text-[15px] leading-7 -mt-3">
        <Reveal delay={0.05}>
          <p>
            I&apos;m a software engineer based in Bengaluru, India, graduating from{" "}
            <span
              onMouseEnter={() => play("hover")}
              className="inline-flex items-baseline group/cmrit cursor-default"
            >
              {/* Raw PNG logo icon with max-w transition, no box/border */}
              <span className="overflow-hidden inline-flex items-center max-w-0 group-hover/cmrit:max-w-[24px] transition-[max-width] duration-200 ease-out align-middle">
                <img
                  src={cmritLogo}
                  alt="CMR Institute of Technology"
                  className="w-[18px] h-[18px] object-contain mr-[5px] shrink-0"
                />
              </span>
              <span className="font-medium text-black/85 dark:text-white/85 group-hover/cmrit:text-black dark:group-hover/cmrit:text-white transition-colors duration-150">
                CMRIT
              </span>
            </span>
            .
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            I architect high-performance AI systems, low-latency real-time applications, and fine-crafted user interfaces. 
            I care deeply about software engineering discipline, mathematical precision, and interface craft — the kind you notice when it&apos;s done right, and miss when it&apos;s not.
          </p>
        </Reveal>
        <Reveal delay={0.19}>
          <p>
            Lately, I&apos;ve been engineering domain-specific Medical RAG pipelines with zero-hallucination guarantees, and building{" "}
            <SiteLink
              to="/work/$slug"
              params={{ slug: "sketch-io" }}
              className="text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white font-medium underline underline-offset-2 decoration-black/25 dark:decoration-white/25 hover:decoration-black dark:hover:decoration-white transition-colors"
            >
              Sketch.io
            </SiteLink>
            , a low-latency collaborative whiteboard built with WebSockets and custom canvas rendering.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p>
            Previously, I&apos;ve engineered LLM-driven QA test generation engines and conducted vulnerability 
            assessments in cyber security audit contexts.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p>
            I&apos;m currently searching for my next role as a software/AI engineer, ideally surrounded by talented engineers who value speed, architecture, and craft equally.
          </p>
        </Reveal>

        {/* Social Links Pill Bar */}
        <Reveal delay={0.34} className="w-full flex flex-wrap items-center gap-2 mt-2">
          <>
            {links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => play("hover")}
                onClick={() => play("click")}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors duration-200 rounded-full h-8 px-4 text-[13px] leading-[13px] font-medium text-black/80 dark:text-white/80 cursor-default outline-none"
              >
                <l.icon className="size-3" />
                {l.label}
              </motion.a>
            ))}
          </>
        </Reveal>
      </section>

      {/* Work Grid Section */}
      <section className="flex flex-col gap-8 text-black/70 dark:text-white/70">
        <RevealOnScroll>
          <div className="flex justify-between items-center w-full">
            <SectionTitle>Work</SectionTitle>
          </div>
        </RevealOnScroll>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0">
          {(showWork ? projects : projects.slice(0, 4)).map((p, idx) => (
            <RevealOnScroll key={p.slug} delay={idx * 0.06}>
              <ProjectCard
                project={p}
                index={idx}
                aspect="4/3"
                hoveredSlug={hoveredWork}
                setHoveredSlug={setHoveredWork}
              />
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <div className="w-full flex justify-end">
            <div className="h-[30px]">
              <button
                onClick={() => { play("click"); setShowWork((s) => !s); }}
                className="text-[10px] uppercase leading-[10px] font-semibold text-black/50 dark:text-white/50 cursor-pointer hover:text-black/80 dark:hover:text-white/80 transition-colors duration-200 h-full"
              >
                {showWork ? "Show less" : "View all"}
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Thoughts Section */}
      <section className="flex flex-col gap-8 text-black/70 dark:text-white/70">
        <RevealOnScroll>
          <SectionTitle>Thoughts</SectionTitle>
        </RevealOnScroll>
        <div className="w-full grid grid-cols-1 gap-x-5 gap-y-0">
          {(showThoughts ? notes : notes.slice(0, 4)).map((n, i) => (
            <RevealOnScroll key={n.slug} delay={i * 0.05}>
              <SiteLink
                to="/thoughts/$slug"
                params={{ slug: n.slug }}
                onMouseEnter={() => { setHoveredNote(n.slug); play("hover"); }}
                onMouseLeave={() => setHoveredNote(null)}
                className={[
                  "block py-2.5 border-b border-black/5 dark:border-white/5 last:border-b-0",
                  "transition-all duration-300",
                  hoveredNote !== null && hoveredNote !== n.slug
                    ? "opacity-[0.25]"
                    : "opacity-100",
                ].join(" ")}
              >
                <div className="flex flex-col gap-1 py-1">
                  <span className={[
                    "text-[15px] leading-7 font-medium transition-colors duration-200",
                    hoveredNote === n.slug
                      ? "text-black dark:text-white"
                      : "text-black/80 dark:text-white/80",
                  ].join(" ")}>
                    {n.title}
                  </span>
                  <div className="flex gap-2">
                    <span className="text-[13px] text-black/50 dark:text-white/50 font-medium">{n.date}</span>
                    <span className="text-[13px] text-black/25 dark:text-white/25 font-medium">•</span>
                    <span className="text-[13px] text-black/25 dark:text-white/25 font-medium">{n.read}</span>
                  </div>
                </div>
              </SiteLink>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <div className="w-full flex justify-end">
            <div className="h-[30px]">
              <button
                onClick={() => { play("click"); setShowThoughts((s) => !s); }}
                className="text-[10px] uppercase leading-[10px] font-semibold text-black/50 dark:text-white/50 cursor-pointer hover:text-black/80 dark:hover:text-white/80 transition-colors duration-200 h-full"
              >
                {showThoughts ? "Show less" : "View all"}
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Craft Grid Section */}
      <section className="flex flex-col gap-8 text-black/70 dark:text-white/70">
        <RevealOnScroll>
          <SectionTitle>Craft</SectionTitle>
        </RevealOnScroll>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-0 gap-y-0">
          {(showCraft ? craft : craft.slice(0, 4)).map((c, idx) => (
            <RevealOnScroll key={c.slug} delay={idx * 0.06}>
              <CraftCard
                item={c}
                index={idx}
                hoveredSlug={hoveredCraft}
                setHoveredSlug={setHoveredCraft}
              />
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <div className="w-full flex justify-end">
            <div className="h-[30px]">
              <button
                onClick={() => { play("click"); setShowCraft((s) => !s); }}
                className="text-[10px] uppercase leading-[10px] font-semibold text-black/50 dark:text-white/50 cursor-pointer hover:text-black/80 dark:hover:text-white/80 transition-colors duration-200 h-full"
              >
                {showCraft ? "Show less" : "View all"}
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </PageShell>
  );
}
