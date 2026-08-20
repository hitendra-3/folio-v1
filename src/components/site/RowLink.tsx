import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "./SiteLink";

export function RowLink({
  to,
  params,
  title,
  meta,
}: {
  to: string;
  params?: Record<string, string>;
  title: string;
  meta: string;
}) {
  return (
    <SiteLink
      to={to as never}
      params={params as never}
      preload="intent"
      className="group flex items-center justify-between gap-4 py-4"
    >
      <motion.span
        className="flex flex-1 items-center justify-between gap-4"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <span className="text-sm transition-colors group-hover:text-foreground">{title}</span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
          {meta}
          <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      </motion.span>
    </SiteLink>
  );
}
