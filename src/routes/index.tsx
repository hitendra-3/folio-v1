import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { PageShell, SectionTitle } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { SiteLink } from "@/components/site/SiteLink";
import { ProjectCard } from "@/components/site/ProjectCard";
import { RowLink } from "@/components/site/RowLink";
import { projects, notes } from "@/lib/content";
import { useSound } from "@/lib/sound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hitendra S — Software Engineer" },
      {
        name: "description",
        content:
          "Software engineer focused on product interfaces, developer tooling and audio on the web. Selected work, writing and interface experiments.",
      },
      { property: "og:title", content: "Hitendra S — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software engineer focused on product interfaces, developer tooling and audio on the web.",
      },
    ],
  }),
  component: Index,
});

const links = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Mail", href: "mailto:hello@example.com", icon: Mail },
  { label: "Résumé", href: "#", icon: FileText },
];

function Index() {
  const { play } = useSound();

  return (
    <PageShell>
      <div className="space-y-5 text-[0.975rem] leading-relaxed text-muted-foreground">
        <Reveal delay={0.05}>
          <p className="text-foreground">I&apos;m a software engineer based in Bengaluru, India.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            I build product interfaces and the systems underneath them — the kind of work where a
            300ms improvement and a well-set line height matter equally. Most of my time goes to
            TypeScript, React and Go.
          </p>
        </Reveal>
        <Reveal delay={0.19}>
          <p>
            Lately I&apos;ve been working on analytics tooling at scale, and on{" "}
            <SiteLink
              to="/work/$slug"
              params={{ slug: "cadence" }}
              className="link-underline text-foreground"
            >
              Cadence
            </SiteLink>
            , a browser music player that taught me most of what I know about the Web Audio API. The
            sound on this site came out of it.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p>
            I care about software that feels quiet and quick. If you&apos;re building something with
            that bar, I&apos;d like to hear about it.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.34} className="mt-8 flex flex-wrap gap-2">
        <>
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => play("hover")}
              onClick={() => play("click")}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-sm transition-colors hover:bg-surface-strong"
            >
              <l.icon className="size-3.5" />
              {l.label}
            </motion.a>
          ))}
        </>
      </Reveal>

      <section className="mt-20">
        <RevealOnScroll>
          <SectionTitle>Work</SectionTitle>
        </RevealOnScroll>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <RevealOnScroll key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <SiteLink
            to="/work"
            className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all <ArrowUpRight className="size-3.5" />
          </SiteLink>
        </RevealOnScroll>
      </section>

      <section className="mt-20">
        <RevealOnScroll>
          <SectionTitle>Thoughts</SectionTitle>
        </RevealOnScroll>
        <div className="divide-y divide-border border-y border-border">
          {notes.slice(0, 3).map((n, i) => (
            <RevealOnScroll key={n.slug} delay={i * 0.06}>
              <RowLink
                to="/thoughts/$slug"
                params={{ slug: n.slug }}
                title={n.title}
                meta={`${n.date} • ${n.read}`}
              />
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.1}>
          <SiteLink
            to="/thoughts"
            className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all <ArrowUpRight className="size-3.5" />
          </SiteLink>
        </RevealOnScroll>
      </section>
    </PageShell>
  );
}
