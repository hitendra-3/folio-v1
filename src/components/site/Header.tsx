import { motion } from "motion/react";
import { useLocation } from "@tanstack/react-router";
import { Home, CornerUpLeft } from "lucide-react";
import profile from "@/assets/profile.jpg";
import { SoundControls } from "./SoundControls";
import { SiteLink } from "./SiteLink";

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Calculate dynamic back route based on path hierarchy
  const getBackPath = (path: string): string => {
    if (path.startsWith("/work/")) return "/work";
    if (path.startsWith("/thoughts/")) return "/thoughts";
    if (path.startsWith("/craft/")) return "/craft";
    return "/";
  };

  const backPath = getBackPath(pathname);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between w-full py-2"
    >
      {isHome ? (
        <div className="flex items-center gap-3 group cursor-default">
          <div className="rounded-full w-12 h-12 overflow-hidden bg-white dark:bg-white border border-black/10 dark:border-white/20 flex items-center justify-center shrink-0">
            <motion.img
              src={profile}
              alt="Portrait of Hitendra S"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
              style={{ imageRendering: "auto" }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-medium text-xl italic leading-none text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150">
              Hitendra S
            </h1>
            <span className="text-sm text-black/70 dark:text-white/70 font-medium font-sans mt-0.5">
              Software Engineer
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/10 rounded-full h-[32px]">
          {/* Home Button */}
          <SiteLink
            to="/"
            className="w-7 h-7 bg-transparent hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80 cursor-pointer outline-none"
            aria-label="Home page"
          >
            <Home className="size-[13px] -mt-px" />
          </SiteLink>
          {/* Divider Line inside the pill */}
          <div className="w-[1px] h-[14px] bg-black/10 dark:bg-white/10" />
          {/* Back Button */}
          <SiteLink
            to={backPath as "/"}
            className="w-7 h-7 bg-transparent hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80 cursor-pointer outline-none"
            aria-label="Go back"
          >
            <CornerUpLeft className="size-[13px]" />
          </SiteLink>
        </div>
      )}

      <SoundControls />
    </motion.header>
  );
}
