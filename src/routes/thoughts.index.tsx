import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { notes } from "@/lib/content";
import { useSound } from "@/lib/sound";

export const Route = createFileRoute("/thoughts/")({
  head: () => ({
    meta: [
      { title: "Thoughts — Hitendra S" },
      {
        name: "description",
        content: "Articles and reflections on system design, LLM engineering, security, and interface implementation by Hitendra S.",
      },
      { property: "og:title", content: "Thoughts — Hitendra S" },
      {
        property: "og:description",
        content: "Articles and reflections on system design, LLM engineering, security, and interface implementation by Hitendra S.",
      },
    ],
  }),
  component: ThoughtsIndex,
});

function ThoughtsIndex() {
  const { play } = useSound();
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);

  return (
    <PageShell scrollLabel="Thoughts">

      {/* Dynamic Subpage Header */}
      <div className="flex flex-col w-full gap-2 -mt-3">
        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl text-black dark:text-white italic font-medium leading-none">
            Thoughts
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[14px] leading-6 tracking-[0.05] font-[450] text-black/70 dark:text-white/70">
            Writings, guides, and notes on software engineering, real-time protocols, and backend reliability.
          </p>
        </Reveal>
      </div>

      {/* Thoughts List Feed */}
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-0">
        {notes.map((n, i) => (
          <RevealOnScroll key={n.slug} delay={i * 0.05}>
            <SiteLink
              to="/thoughts/$slug"
              params={{ slug: n.slug }}
              onMouseEnter={() => { setHoveredNote(n.slug); play("hover"); }}
              onMouseLeave={() => setHoveredNote(null)}
              className={[
                "block py-3 border-b border-black/5 dark:border-white/5 last:border-b-0",
                "transition-all duration-300",
                hoveredNote !== null && hoveredNote !== n.slug
                  ? "opacity-[0.25]"
                  : "opacity-100",
              ].join(" ")}
            >
              <div className="flex flex-col gap-1 py-1">
                <span
                  className={[
                    "text-[15px] leading-7 font-medium transition-colors duration-200",
                    hoveredNote === n.slug
                      ? "text-black dark:text-white"
                      : "text-black/80 dark:text-white/80",
                  ].join(" ")}
                >
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
    </PageShell>
  );
}
