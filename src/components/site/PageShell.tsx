import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSound } from "@/lib/sound";
import { ScrollLoader } from "./ScrollLoader";

export type PageShellProps = {
  children: ReactNode;
  scrollLabel?: string;
  /** Set to true on reading pages (project/craft/thoughts detail) to show scroll progress indicator */
  showScrollLoader?: boolean;
};

/** Shared page frame: identical entrance animation + arrival sound on every page. */
export function PageShell({ children, scrollLabel, showScrollLoader = false }: PageShellProps) {
  const { play } = useSound();

  useEffect(() => {
    play("nav");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[669px] px-6 sm:px-8 py-20 md:py-28 flex flex-col gap-20 text-black dark:text-white"
      >
        <Header />
        <main className="flex flex-col gap-20 w-full">{children}</main>
        <Footer />
      </motion.div>

      {/* Scroll Progress Indicator — only on reading/detail pages */}
      {showScrollLoader && <ScrollLoader label={scrollLabel ?? "Hitendra S"} />}

      {/* Bottom fade overlay — smooth gradient blending content into background */}
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none z-40"
        style={{
          height: "96px",
          background: "linear-gradient(to top, var(--color-background) 0%, var(--color-background) 15%, color-mix(in oklab, var(--color-background) 85%, transparent) 45%, color-mix(in oklab, var(--color-background) 40%, transparent) 70%, transparent 100%)",
        }}
      />
    </>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display font-medium text-[22px] sm:text-2xl italic text-foreground leading-none">{children}</h2>;
}
