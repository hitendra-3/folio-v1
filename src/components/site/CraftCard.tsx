import { motion } from "motion/react";
import { SiteLink } from "./SiteLink";
import type { CraftItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export type CraftCardProps = {
  item: CraftItem;
  index?: number;
  hoveredSlug?: string | null;
  setHoveredSlug?: (slug: string | null) => void;
};

export function CraftCard({ item, index, hoveredSlug, setHoveredSlug }: CraftCardProps) {
  const isOdd = index !== undefined && index % 2 !== 0;
  const isDimmed = hoveredSlug !== null && hoveredSlug !== undefined && hoveredSlug !== item.slug;

  return (
    <div
      onMouseEnter={() => setHoveredSlug?.(item.slug)}
      onMouseLeave={() => setHoveredSlug?.(null)}
      className={cn(
        "transition-all duration-500",
        isDimmed ? "blur-[1px] opacity-60 scale-[0.99]" : "opacity-100 scale-100"
      )}
    >
      <SiteLink
        to="/craft/$slug"
        params={{ slug: item.slug }}
        className={cn(
          "group block cursor-pointer pt-2.5 pb-2.5 md:pt-0",
          index !== undefined && (isOdd ? "md:pl-2.5" : "md:pr-2.5")
        )}
        preload="intent"
      >
        <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] hover:border-black/20 dark:hover:border-white/15 transition-colors">
          <div className="overflow-hidden rounded-md">
            <motion.img
              src={item.cover}
              alt={`${item.title} craft cover`}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full object-cover aspect-[3/2] bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
          <div className="w-full px-2 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium font-sans">
                {item.title}
              </span>
              <span className="text-[13px] text-black/50 dark:text-white/50 font-medium font-sans">
                {item.date}
              </span>
            </div>
          </div>
        </div>
      </SiteLink>
    </div>
  );
}
