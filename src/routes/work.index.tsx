import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/lib/content";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Hitendra S" },
      {
        name: "description",
        content: "Selected software engineering projects, real-time whiteboards, and AI architectures by Hitendra S.",
      },
      { property: "og:title", content: "Work — Hitendra S" },
      {
        property: "og:description",
        content: "Selected software engineering projects, real-time whiteboards, and AI architectures by Hitendra S.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <PageShell scrollLabel="Work">

      {/* Dynamic Subpage Header */}
      <div className="flex flex-col w-full gap-2 -mt-3">
        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl text-black dark:text-white italic font-medium leading-none">
            Work
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[14px] leading-6 tracking-[0.05] font-[450] text-black/70 dark:text-white/70">
            Selected projects and architectures from my work in system development and AI engineering.
          </p>
        </Reveal>
      </div>

      {/* Gap-less Offset Column Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0">
        {projects.map((p, i) => (
          <RevealOnScroll key={p.slug} delay={i * 0.08}>
            <ProjectCard
              project={p}
              index={i}
              aspect="4/3"
              hoveredSlug={hoveredSlug}
              setHoveredSlug={setHoveredSlug}
            />
          </RevealOnScroll>
        ))}
      </div>
    </PageShell>
  );
}
