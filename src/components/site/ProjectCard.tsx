import { motion } from "motion/react";
import { SiteLink } from "./SiteLink";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SiteLink
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block"
      preload="intent"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="overflow-hidden rounded-xl bg-card shadow-card ring-1 ring-border"
      >
        <div className="overflow-hidden">
          <motion.img
            src={project.cover}
            alt={`${project.title} project cover`}
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-baseline justify-between gap-3 px-4 py-3">
          <span className="text-sm font-medium">{project.title}</span>
          <span className="text-xs text-muted-foreground">{project.kind}</span>
        </div>
      </motion.div>
    </SiteLink>
  );
}
