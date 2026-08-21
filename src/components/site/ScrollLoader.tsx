import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export type ScrollLoaderProps = {
  label: string;
};

export function ScrollLoader({ label: defaultLabel }: ScrollLoaderProps) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState(defaultLabel);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.scrollY;

      // Track scroll percentage
      if (totalHeight > 30) {
        const percent = Math.min(Math.max(currentY / totalHeight, 0), 1);
        setScrollPercent(percent);
        setVisible(currentY > 80);
      } else {
        setScrollPercent(0);
        setVisible(false);
      }

      // Track current section heading in view (iterate backwards to find active section)
      const headings = Array.from(document.querySelectorAll("article h1, article h2, article h3, main h2"));
      let currentHeading = defaultLabel;
      const triggerPoint = window.innerHeight * 0.35;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (!heading) continue;
        const rect = heading.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          const text = heading.textContent?.trim();
          if (text) {
            currentHeading = text;
            break;
          }
        }
      }

      setActiveLabel(currentHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [defaultLabel]);

  // SVG parameters
  const size = 14;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollPercent * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 15, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 15, x: "-50%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 bg-black dark:bg-[#1E1E20] text-white h-[32px] w-[230px] max-w-[calc(100vw-32px)] pl-3.5 pr-2.5 rounded-full flex items-center gap-3 shadow-[0_6px_20px_rgba(0,0,0,0.2)] z-50 text-[11px] font-sans font-normal border border-white/10 select-none cursor-default"
        >
          {/* Left Solid Dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#A7C2D8] shrink-0" />

          {/* Text Label with Max Width Truncation */}
          <span className="flex-1 truncate whitespace-nowrap leading-none tracking-wide font-normal text-white/85">
            {activeLabel}
          </span>

          {/* Circular Progress Ring */}
          <div className="size-[14px] shrink-0 flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
              {/* Background Ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth={strokeWidth}
              />
              {/* Active Progress Segment */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
