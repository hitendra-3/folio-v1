import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { craft } from "@/lib/content";
import {
  NodePlucker,
  GravitationalVortex,
  AcousticWaveform,
  KineticCompass,
  PixelRain,
} from "./craft.index";

// Resolve component based on slug
const componentsMap: Record<string, React.ComponentType> = {
  "node-plucker": NodePlucker,
  "gravitational-vortex": GravitationalVortex,
  "acoustic-waveform": AcousticWaveform,
  "kinetic-compass": KineticCompass,
  "pixel-rain": PixelRain,
};

export const Route = createFileRoute("/craft/$slug")({
  head: ({ params }) => {
    const item = craft.find((c) => c.slug === params.slug);
    const title = item ? `${item.title} — Craft — Hitendra S` : "Craft — Hitendra S";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: item?.note || "Interactive sandbox experiment by Hitendra S.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: item?.note || "Interactive sandbox experiment by Hitendra S.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const item = craft.find((c) => c.slug === params.slug);
    if (!item) {
      throw notFound();
    }
    return { item };
  },
  component: CraftDetail,
});

function CraftDetail() {
  const { item } = Route.useLoaderData();
  const Component = componentsMap[item.slug];

  const currentIndex = craft.findIndex((c) => c.slug === item.slug);
  const prevCraft = craft[(currentIndex - 1 + craft.length) % craft.length];
  const nextCraft = craft[(currentIndex + 1) % craft.length];

  return (
    <PageShell scrollLabel={item.title} showScrollLoader>

      <article className="space-y-10">
        <header className="space-y-4">
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl font-normal italic leading-none text-black dark:text-white">
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-black/50 dark:text-white/50">
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-black/40 dark:text-white/40">
                  Released
                </span>
                <span className="text-black/80 dark:text-white/85 font-medium">{item.date}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-black/40 dark:text-white/40">
                  Interaction
                </span>
                <span className="text-black/80 dark:text-white/85 font-medium">Tactile Web Audio / Canvas</span>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Interactive Play Box */}
        <Reveal delay={0.24}>
          <div className="rounded-[10px] border border-black/10 dark:border-white/5 bg-white dark:bg-white/10 overflow-hidden p-5 shadow-card">
            {Component ? <Component /> : <div className="text-center py-10">Widget not found.</div>}
          </div>
        </Reveal>

        {/* Details & Info */}
        <div className="space-y-6">
          <RevealOnScroll>
            <h2 className="font-display font-medium text-lg italic text-black dark:text-white leading-none">
              How it works
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <p className="text-[15px] leading-7 text-black/70 dark:text-white/70">
              {item.note} The entire component is built using vanilla canvas rendering, custom physical vector mathematics (mass-spring-damper simulations), and the native Web Audio API to link visuals directly to acoustic waveforms.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[15px] leading-7 text-black/70 dark:text-white/70">
              Hover over or click and drag inside the interactive canvas frame above to engage the physical nodes. The sound context will start playing synthesized sound waves dynamically based on the coordinate points, damping settings, or friction metrics.
            </p>
          </RevealOnScroll>
        </div>

        {/* Next/Prev Navigation Footer */}
        <footer className="border-t border-black/5 dark:border-white/5 pt-8 mt-12">
          <div className="flex items-center justify-between text-sm">
            {prevCraft && (
              <SiteLink
                to="/craft/$slug"
                params={{ slug: prevCraft.slug }}
                className="group flex flex-col items-start gap-1 cursor-default text-black/50 dark:text-white/55 hover:text-black/80 dark:hover:text-white/80 transition-colors"
              >
                <span className="text-[10px] uppercase font-semibold text-black/30 dark:text-white/30 flex items-center gap-1">
                  <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" /> Previous
                </span>
                <span className="font-sans font-medium text-black/80 dark:text-white/80">{prevCraft.title}</span>
              </SiteLink>
            )}

            {nextCraft && (
              <SiteLink
                to="/craft/$slug"
                params={{ slug: nextCraft.slug }}
                className="group flex flex-col items-end gap-1 cursor-default text-black/50 dark:text-white/55 hover:text-black/80 dark:hover:text-white/80 transition-colors text-right"
              >
                <span className="text-[10px] uppercase font-semibold text-black/30 dark:text-white/30 flex items-center gap-1">
                  Next <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="font-sans font-medium text-black/80 dark:text-white/80">{nextCraft.title}</span>
              </SiteLink>
            )}
          </div>
        </footer>
      </article>
    </PageShell>
  );
}
