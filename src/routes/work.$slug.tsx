import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { projects } from "@/lib/content";
import { useSound } from "@/lib/sound";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} — Hitendra S` : "Project — Hitendra S";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: project?.summary || "Project detail for Hitendra S's portfolio.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: project?.summary || "Project detail for Hitendra S's portfolio.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const { play } = useSound();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageShell scrollLabel={project.title} showScrollLoader>

      <article className="space-y-10">
        <header className="space-y-6">
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <div className="space-y-1">
                <h1 className="font-display italic text-4xl sm:text-5xl font-medium text-foreground leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm text-muted-foreground font-sans">
                  {project.kind} • {project.year}
                </p>
              </div>

              {/* GitHub Pill Button */}
              {project.githubUrl && (
                <div className="shrink-0">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("click")}
                    className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-xs font-medium text-black/80 dark:text-white/80 cursor-pointer"
                  >
                    <Github className="size-3.5 text-black/60 dark:text-white/60 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">GitHub</span>
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-4 border-t border-black/10 dark:border-white/10">
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground/60">
                  Role
                </span>
                <span className="text-foreground">{project.role}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground/60">
                  Services
                </span>
                <span className="text-foreground">{project.kind}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground/60">
                  Year
                </span>
                <span className="text-foreground">{project.year}</span>
              </div>
            </div>
          </Reveal>
        </header>

        <div className="flex flex-col gap-6 w-full">
          <div className="space-y-5 w-full">
            {project.body.map((p, idx) => {
              if (p.startsWith("## ")) {
                return (
                  <RevealOnScroll key={idx} delay={idx * 0.05}>
                    <h2 className="font-display font-medium text-lg italic text-black dark:text-white leading-none mt-10 mb-4 [&:first-child]:mt-0">
                      {p.replace("## ", "")}
                    </h2>
                  </RevealOnScroll>
                );
              }
              return (
                <RevealOnScroll key={idx} delay={idx * 0.05}>
                  <p className="text-[15px] leading-7 text-black/70 dark:text-white/70">{p}</p>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Technologies — horizontal wrap at the very end after all phases */}
          <div className="space-y-3 border-t border-black/5 dark:border-white/5 pt-8 mt-6">
            <RevealOnScroll>
              <h3 className="text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50 font-semibold font-mono">
                Technologies
              </h3>
            </RevealOnScroll>
            <div className="flex flex-wrap gap-2 items-center">
              {project.stack.map((s, idx) => (
                <RevealOnScroll key={s} delay={idx * 0.04}>
                  <span className="rounded-md bg-black/5 dark:bg-white/10 px-3 py-1 text-xs text-black/80 dark:text-white/80 font-mono border border-black/5 dark:border-white/5">
                    {s}
                  </span>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="mt-20 border-t border-border pt-12">
        <RevealOnScroll>
          <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
            {nextProject ? "Next Project" : "All Projects"}
          </span>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          {nextProject ? (
            <SiteLink
              to="/work/$slug"
              params={{ slug: nextProject.slug }}
              className="group mt-2 block cursor-pointer"
              preload="intent"
            >
              <div className="flex items-center justify-between py-6">
                <span className="display text-3xl font-normal text-black/60 dark:text-white/60 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  {nextProject.title}
                </span>
                <div className="flex size-12 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 transition-colors">
                  <ArrowRight className="size-4 text-black/60 dark:text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                </div>
              </div>
            </SiteLink>
          ) : (
            <SiteLink
              to="/work"
              className="group mt-2 block cursor-pointer"
              preload="intent"
            >
              <div className="flex items-center justify-between py-6">
                <span className="display text-3xl font-normal text-black/60 dark:text-white/60 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400 sm:text-4xl">
                  All Projects Overview
                </span>
                <div className="flex size-12 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 transition-colors">
                  <ArrowRight className="size-4 text-black/60 dark:text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                </div>
              </div>
            </SiteLink>
          )}
        </RevealOnScroll>
      </section>
    </PageShell>
  );
}
