import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useSound } from "@/lib/sound";

export function SoundControls() {
  const { enabled, setEnabled, play, musicPlaying, toggleMusic, level } = useSound();

  return (
    <div className="flex items-center gap-1 rounded-full bg-surface p-1">
      <button
        type="button"
        aria-label={enabled ? "Mute interface sound" : "Enable interface sound"}
        aria-pressed={enabled}
        onClick={() => {
          setEnabled(!enabled);
          if (enabled) play("toggle");
        }}
        onMouseEnter={() => play("hover")}
        className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
      >
        {enabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
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
            className="flex items-center gap-2 overflow-hidden rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
          >
            {musicPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span className="flex items-end gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-current"
                  animate={{
                    height: musicPlaying ? [4, 4 + level * 10 + i * 2, 4] : 4,
                  }}
                  transition={{
                    duration: 0.9 + i * 0.15,
                    repeat: musicPlaying ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
            <span className="whitespace-nowrap">Ambience</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
