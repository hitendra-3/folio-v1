import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import bgJazzUrl from "@/assets/bg-jazz-2.mp3";
import magicSweepUrl from "@/assets/magic-sweep-2.wav";

export type Cue = "hover" | "click" | "nav" | "toggle";

type SoundApi = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (cue: Cue) => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  playThemeSweep: () => void;
  level: number;
};

const SoundContext = createContext<SoundApi | null>(null);

const CUES: Record<Cue, { freq: number; dur: number; gain: number; type: OscillatorType }> = {
  hover: { freq: 1180, dur: 0.05, gain: 0.08, type: "sine" },
  click: { freq: 660, dur: 0.08, gain: 0.14, type: "triangle" },
  nav: { freq: 440, dur: 0.18, gain: 0.10, type: "sine" },
  toggle: { freq: 880, dur: 0.1, gain: 0.12, type: "square" },
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [level, setLevel] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored === "0") setEnabledState(false);
  }, []);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const getBgMusic = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!bgMusicRef.current) {
      const audio = new Audio(bgJazzUrl);
      audio.loop = true;
      audio.volume = 0.50; // Slightly increased ambient jazz volume
      bgMusicRef.current = audio;
    }
    return bgMusicRef.current;
  }, []);

  const playThemeSweep = useCallback(() => {
    if (!enabled) return;
    try {
      const audio = new Audio(magicSweepUrl);
      audio.volume = 0.45; // Slightly increased theme sweep volume
      audio.play().catch(() => { });
    } catch { }
  }, [enabled]);

  const pendingCueRef = useRef<Cue | null>(null);

  useEffect(() => {
    const resumeAudio = () => {
      const ctx = getCtx();
      if (!ctx) return;

      const drain = () => {
        if (pendingCueRef.current) {
          const cue = pendingCueRef.current;
          pendingCueRef.current = null;

          if (cue === "toggle") {
            playThemeSweep();
          } else {
            const { freq, dur, gain, type } = CUES[cue];
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 2600;
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * (cue === "nav" ? 1.5 : 0.85), now + dur);
            g.gain.setValueAtTime(0.0001, now);
            g.gain.exponentialRampToValueAtTime(gain, now + 0.008);
            g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            osc.connect(filter).connect(g).connect(ctx.destination);
            osc.start(now);
            osc.stop(now + dur + 0.02);
          }
        }
        cleanup();
      };

      if (ctx.state === "suspended") {
        ctx.resume().then(drain);
      } else {
        drain();
      }
    };

    const cleanup = () => {
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
      window.removeEventListener("mousemove", resumeAudio);
    };

    window.addEventListener("click", resumeAudio, { passive: true });
    window.addEventListener("keydown", resumeAudio, { passive: true });
    window.addEventListener("touchstart", resumeAudio, { passive: true });
    window.addEventListener("mousemove", resumeAudio, { passive: true, once: true });

    return cleanup;
  }, [getCtx, playThemeSweep]);

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      if (cue === "toggle") {
        playThemeSweep();
        return;
      }
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        pendingCueRef.current = cue;
        return;
      }
      const { freq, dur, gain, type } = CUES[cue];
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2600;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * (cue === "nav" ? 1.5 : 0.85), now + dur);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(gain, now + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(filter).connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    },
    [enabled, getCtx, playThemeSweep],
  );

  const stopMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
    setMusicPlaying(false);
    setLevel(0);
  }, []);

  const startMusic = useCallback(() => {
    const audio = getBgMusic();
    if (audio) {
      audio.volume = 0.25; // Slightly increased ambient jazz volume
      audio
        .play()
        .then(() => {
          setMusicPlaying(true);
          setLevel(0.6);
        })
        .catch(() => { });
    }
  }, [getBgMusic]);

  const toggleMusic = useCallback(() => {
    if (musicPlaying) stopMusic();
    else startMusic();
  }, [musicPlaying, startMusic, stopMusic]);

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v);
      localStorage.setItem("sound-enabled", v ? "1" : "0");
      if (!v) {
        stopMusic();
      }
    },
    [stopMusic],
  );

  useEffect(() => () => stopMusic(), [stopMusic]);

  const value = useMemo(
    () => ({ enabled, setEnabled, play, musicPlaying, toggleMusic, playThemeSweep, level }),
    [enabled, setEnabled, play, musicPlaying, toggleMusic, playThemeSweep, level],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

/** Spread onto any interactive element for the shared hover/click sound language. */
export function useSoundProps(cue: Cue = "click") {
  const { play } = useSound();
  return {
    onMouseEnter: () => play("hover"),
    onClick: () => play(cue),
  };
}
