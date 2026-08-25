import { SiteLink } from "./SiteLink";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Stethoscope, Palette, FileCode, MessageSquare, ShoppingCart, ArrowUpRight, Folder } from "lucide-react";
import { useSound } from "@/lib/sound";

const PROJECT_ICONS: Record<string, any> = {
  medibot: Stethoscope,
  "sketch-io": Palette,
  "qa-test-generator": FileCode,
  fluxchat: MessageSquare,
  "ai-checkout-recovery": ShoppingCart,
};

export type ProjectCardProps = {
  project: Project;
  index?: number;
  hoveredSlug?: string | null;
  setHoveredSlug?: (slug: string | null) => void;
};

export function ProjectCard({
  project,
  hoveredSlug,
  setHoveredSlug,
}: ProjectCardProps) {
  const { play } = useSound();
  const Icon = PROJECT_ICONS[project.slug] || Folder;
  const isDimmed = hoveredSlug !== null && hoveredSlug !== undefined && hoveredSlug !== project.slug;

  return (
    <div
      onMouseEnter={() => {
        setHoveredSlug?.(project.slug);
        play("hover");
      }}
      onMouseLeave={() => setHoveredSlug?.(null)}
      className={cn(
        "transition-all duration-300 py-1 border-b border-black/5 dark:border-white/5 last:border-b-0",
        isDimmed ? "opacity-30" : "opacity-100"
      )}
    >
      <SiteLink
        to="/work/$slug"
        params={{ slug: project.slug }}
        onClick={() => play("click")}
        className="group flex items-center justify-between gap-3 py-2 cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className="size-4 text-black/60 dark:text-white/60 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-200 shrink-0" />
          <div className="flex items-baseline gap-2 min-w-0 flex-wrap sm:flex-nowrap">
            <span className="font-medium text-[15px] leading-snug text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150 shrink-0">
              {project.title}
            </span>
            <span className="text-black/30 dark:text-white/30 text-[13px] font-sans shrink-0">·</span>
            <span className="text-[14px] leading-snug text-black/60 dark:text-white/60 font-sans truncate max-w-full">
              {project.summary}
            </span>
          </div>
        </div>
        <ArrowUpRight className="size-3.5 text-black/30 dark:text-white/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1 hidden sm:block" />
      </SiteLink>
    </div>
  );
}
