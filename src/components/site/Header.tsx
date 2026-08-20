import { motion } from "motion/react";
import avatar from "@/assets/avatar.jpg";
import { SoundControls } from "./SoundControls";
import { SiteLink } from "./SiteLink";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/thoughts", label: "Thoughts" },
  { to: "/craft", label: "Craft" },
] as const;

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between gap-4"
    >
      <SiteLink to="/" className="group flex items-center gap-3">
        <motion.img
          src={avatar}
          alt="Portrait of Hitendra S"
          width={512}
          height={512}
          className="size-11 rounded-full object-cover ring-1 ring-border"
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        />
        <span className="leading-tight">
          <span className="display block text-xl">Hitendra S</span>
          <span className="block text-sm text-muted-foreground">Software Engineer</span>
        </span>
      </SiteLink>

      <div className="flex items-center gap-2">
        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <SiteLink
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "bg-surface text-foreground" }}
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <SoundControls />
      </div>
    </motion.header>
  );
}
