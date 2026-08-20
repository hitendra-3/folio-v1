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

export type Cue = "hover" | "click" | "nav" | "toggle";

type SoundApi = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (cue: Cue) => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  level: number;
};

const SoundContext = createContext<SoundApi | null>(null);

const CUES: Record<Cue, { freq: number; dur: number; gain: number; type: OscillatorType }> = {
  hover: { freq: 1180, dur: 0.05, gain: 0.035, type: "sine" },
  click: { freq: 660, dur: 0.09, gain: 0.07, type: "triangle" },
  nav: { freq: 440, dur: 0.22, gain: 0.05, type: "sine" },
  toggle: { freq: 880, dur: 0.12, gain: 0.06, type: "square" },
};

// Soft pentatonic ambience, generated — no audio assets required.
const SCALE = [261.63, 311.13, 349.23, 392.0, 466.16, 523.25, 622.25];

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [level, setLevel] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored === "1") setEnabledState(true);
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

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
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
    [enabled, getCtx],
  );

  const stopMusic = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    const g = musicGainRef.current;
    const ctx = ctxRef.current;
    if (g && ctx) {
      g.gain.cancelScheduledValues(ctx.currentTime);
      g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3);
    }
    setMusicPlaying(false);
    setLevel(0);
  }, []);

  const startMusic = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    if (!musicGainRef.current) {
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      g.connect(ctx.destination);
      musicGainRef.current = g;
    }
    const master = musicGainRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.14, ctx.currentTime, 0.8);

    const note = () => {
      const c = ctxRef.current;
      if (!c) return;
      const now = c.currentTime;
      const f = SCALE[Math.floor(Math.random() * SCALE.length)] * (Math.random() < 0.3 ? 0.5 : 1);
      const osc = c.createOscillator();
      const g = c.createGain();
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1400;
      osc.type = "sine";
      osc.frequency.value = f;
      const dur = 2.4 + Math.random() * 2;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.35, now + 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(filter).connect(g).connect(master);
      osc.start(now);
      osc.stop(now + dur + 0.1);
      setLevel(0.4 + Math.random() * 0.6);
    };

    note();
    timerRef.current = setInterval(note, 1400);
    setMusicPlaying(true);
  }, [getCtx]);

  const toggleMusic = useCallback(() => {
    if (musicPlaying) stopMusic();
    else startMusic();
  }, [musicPlaying, startMusic, stopMusic]);

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v);
      localStorage.setItem("sound-enabled", v ? "1" : "0");
      if (v) {
        const ctx = getCtx();
        if (ctx) {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
          osc.connect(g).connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
        }
      } else {
        stopMusic();
      }
    },
    [getCtx, stopMusic],
  );

  useEffect(() => () => stopMusic(), [stopMusic]);

  const value = useMemo(
    () => ({ enabled, setEnabled, play, musicPlaying, toggleMusic, level }),
    [enabled, setEnabled, play, musicPlaying, toggleMusic, level],
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
