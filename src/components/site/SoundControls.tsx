import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX, Pause, Play, Sun, Moon } from "lucide-react";
import { useSound } from "@/lib/sound";
import { useRef, useEffect, useState } from "react";

export function SoundControls() {
  const { enabled, setEnabled, play, musicPlaying, toggleMusic } = useSound();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const themeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "light" ? "dark" : "light";

    const updateTheme = () => {
      setTheme(nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    // Calculate exact button center for expanding circular view transition
    const btn = themeBtnRef.current || (e.currentTarget as HTMLButtonElement);
    const rect = btn?.getBoundingClientRect ? btn.getBoundingClientRect() : null;
    const x = rect && rect.width > 0 ? rect.left + rect.width / 2 : window.innerWidth - 36;
    const y = rect && rect.height > 0 ? rect.top + rect.height / 2 : 28;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      updateTheme();
      play("toggle");
      return;
    }

    const transition = document.startViewTransition(updateTheme);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.2, 0, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    play("toggle");
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/10 rounded-full h-[32px] shrink-0">
      <button
        type="button"
        aria-label={enabled ? "Mute interface sound" : "Enable interface sound"}
        aria-pressed={enabled}
        onClick={() => {
          if (enabled) play("click");
          setEnabled(!enabled);
        }}
        onMouseEnter={() => play("hover")}
        className="w-7 h-7 bg-transparent hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80 cursor-pointer outline-none"
      >
        {enabled ? <Volume2 className="size-[14px]" /> : <VolumeX className="size-[14px]" />}
      </button>

      <AnimatePresence initial={false}>
        {enabled && (
          <motion.button
            type="button"
            aria-label={musicPlaying ? "Pause ambience" : "Play ambience"}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              play("click");
              toggleMusic();
            }}
            onMouseEnter={() => play("hover")}
            className="flex items-center gap-1.5 overflow-hidden rounded-full px-2 py-1 text-xs text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-400 h-7 transition-colors cursor-pointer outline-none"
          >
            {musicPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span className="flex items-end gap-[2px] h-3.5 items-center">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-current block"
                  style={{
                    height: "4px",
                    minHeight: "4px",
                    maxHeight: "14px",
                    animation: musicPlaying
                      ? `wave-bar ${0.5 + i * 0.13}s ease-in-out ${i * 0.08}s infinite alternate`
                      : "none",
                    transform: "translateZ(0)",
                  }}
                />
              ))}
            </span>
            <span className="whitespace-nowrap pr-1 text-[11px] font-medium font-sans">Ambience</span>
          </motion.button>
        )}
      </AnimatePresence>

      <button
        ref={themeBtnRef}
        type="button"
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        onClick={toggleTheme}
        onMouseEnter={() => play("hover")}
        className="w-7 h-7 bg-transparent hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80 cursor-pointer outline-none overflow-hidden relative"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "light" ? <Moon className="size-[13px]" /> : <Sun className="size-[13px]" />}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
