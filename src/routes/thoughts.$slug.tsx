import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { notes } from "@/lib/content";

export const Route = createFileRoute("/thoughts/$slug")({
  head: ({ params }) => {
    const note = notes.find((n) => n.slug === params.slug);
    const title = note ? `${note.title} — Hitendra S` : "Thought — Hitendra S";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: note ? note.body[0] : "Thought detail for Hitendra S's portfolio.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: note ? note.body[0] : "Thought detail for Hitendra S's portfolio.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const note = notes.find((n) => n.slug === params.slug);
    if (!note) {
      throw notFound();
    }
    return { note };
  },
  component: ThoughtDetail,
});

function ThoughtDetail() {
  const { note } = Route.useLoaderData();

  return (
    <PageShell scrollLabel={note.title} showScrollLoader>

      <article className="space-y-8">
        <header className="space-y-3">
          <Reveal delay={0.1}>
            <h1 className="display text-3.5xl sm:text-4xl font-normal leading-tight text-foreground">
              {note.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{note.date} &bull; {note.read}</span>
              {note.mediumUrl && (
                <a
                  href={note.mediumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 hover:text-blue-500 dark:hover:text-blue-400 text-black/80 dark:text-white/80 transition-colors duration-150 cursor-pointer"
                >
                  Read on Medium ↗
                </a>
              )}
            </div>
          </Reveal>
        </header>

        <div className="space-y-5">
          {note.body.map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <RevealOnScroll key={idx} delay={idx * 0.05}>
                  <h2 className="font-display font-medium text-lg italic text-black dark:text-white leading-none mt-10 mb-4 [&:first-child]:mt-0">
                    {paragraph.replace("## ", "")}
                  </h2>
                </RevealOnScroll>
              );
            }
            return (
              <RevealOnScroll key={idx} delay={idx * 0.05}>
                <p className="text-[15px] leading-7 text-black/70 dark:text-white/70">{paragraph}</p>
              </RevealOnScroll>
            );
          })}
        </div>
      </article>
    </PageShell>
  );
}
