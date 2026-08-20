import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSound } from "@/lib/sound";

/** Shared page frame: identical entrance animation + arrival sound on every page. */
export function PageShell({ children }: { children: ReactNode }) {
  const { play } = useSound();

  useEffect(() => {
    play("nav");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[42rem] px-5 py-14 sm:py-20"
    >
      <Header />
      <main className="mt-14">{children}</main>
      <Footer />
    </motion.div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="display mb-6 text-2xl">{children}</h2>;
}
