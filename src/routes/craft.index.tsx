import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealOnScroll } from "@/components/site/Reveal";
import { CraftCard } from "@/components/site/CraftCard";
import { craft } from "@/lib/content";
import { useSound } from "@/lib/sound";
import Stack from "@/components/Stack";
import createGlobe from "cobe";

export const Route = createFileRoute("/craft/")({
  head: () => ({
    meta: [
      { title: "Craft — Hitendra S" },
      {
        name: "description",
        content: "Interactive UI experiments, physics simulations, and audio toys built by Hitendra S.",
      },
      { property: "og:title", content: "Craft â€” Hitendra S" },
      {
        property: "og:description",
        content: "Interactive UI experiments, physics simulations, and audio toys built by Hitendra S.",
      },
    ],
  }),
  component: CraftIndex,
});

function CraftIndex() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <PageShell scrollLabel="Craft">

      {/* Dynamic Subpage Header */}
      <div className="flex flex-col w-full gap-2 -mt-3">
        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl text-black dark:text-white italic font-medium leading-none">
            Craft
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[14px] leading-6 tracking-[0.05] font-[450] text-black/70 dark:text-white/70">
            A sandbox of interactive experiments, audio toys, and tactile web elements built to explore the physical feel of digital interactions.
          </p>
        </Reveal>
      </div>

      {/* Single-column Minimal List */}
      <div className="w-full grid grid-cols-1 gap-y-1">
        {craft.map((c, i) => (
          <RevealOnScroll key={c.slug} delay={i * 0.05}>
            <CraftCard
              item={c}
              index={i}
              hoveredSlug={hoveredSlug}
              setHoveredSlug={setHoveredSlug}
            />
          </RevealOnScroll>
        ))}
      </div>
    </PageShell>
  );
}

// -----------------------------------------------------------------
// Craft Component 1: Memory Stack â€” Draggable Identity Card Deck
// -----------------------------------------------------------------
export function PrismLightWeaver() {
  const cardData = [
    {
      key: "1",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
      quote: "stay curious.",
    },
    {
      key: "2",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
      quote: "breathe deep.",
    },
    {
      key: "3",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500&auto=format&fit=crop",
      quote: "go further.",
    },
    {
      key: "4",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
      quote: "above noise.",
    },
  ];

  const cards = cardData.map(({ key, src, quote }) => (
    <div key={key} className="stack-photo-card">
      <img
        src={src}
        alt={quote}
        className="stack-card-img"
      />
      <div className="stack-card-overlay" />
      <p style={{
        position: "absolute",
        bottom: "16px",
        left: "16px",
        margin: 0,
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.03em",
        color: "rgba(255, 255, 255, 0.92)",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.2,
        textShadow: "0 1px 8px rgba(0,0,0,0.6)",
        pointerEvents: "none",
      }}>
        {quote}
      </p>
    </div>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%" }}>
      <div className="relative w-full flex items-center justify-center" style={{ height: 275 }}>
        <div style={{ width: 205, height: 245 }}>
          <Stack
            randomRotation={true}
            sensitivity={140}
            sendToBackOnClick={true}
            autoplay={true}
            autoplayDelay={3800}
            pauseOnHover={true}
            enableSound={true}
            animationConfig={{ stiffness: 220, damping: 22 }}
            cards={cards}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-black/40 dark:text-white/35 pointer-events-none select-none">
        <span>drag</span>
        <span className="text-black/20 dark:text-white/20">Â·</span>
        <span>hover to reveal</span>
        <span className="text-black/20 dark:text-white/20">Â·</span>
        <span>click to cycle</span>
      </div>
    </div>
  );
}


// Craft Component 1: Node Plucker (5-String Polyphonic Kinetic Harp)
// -----------------------------------------------------------------
export function NodePlucker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  const notes = [
    { name: "C4", freq: 261.63 },
    { name: "E4", freq: 329.63 },
    { name: "G4", freq: 392.00 },
    { name: "A4", freq: 440.00 },
    { name: "C5", freq: 523.25 },
  ];

  const stringsRef = useRef(
    notes.map(() => ({
      y: 0,
      targetY: 0,
      velocity: 0,
      dragY: 0,
      isDragging: false,
      activeDeflection: 0,
    }))
  );

  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string }[]>([]);
  const lastSoundRef = useRef<number[]>(notes.map(() => 0));

  const playSynthNote = (freq: number, index: number) => {
    const nowMs = Date.now();
    if (nowMs - lastSoundRef.current[index] < 80) return;
    lastSoundRef.current[index] = nowMs;

    try {
      if (!audioCtxRef.current) {
        const Ctor = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new Ctor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  };

  const spawnParticles = (x: number, y: number) => {
    const colors = ["#60a5fa", "#38bdf8", "#818cf8", "#c084fc", "#f472b6"];
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        alpha: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const stringSpacing = height / (notes.length + 1);

      // Render & update strings
      stringsRef.current.forEach((str, i) => {
        const baseY = stringSpacing * (i + 1);

        // Spring physics: F = -k * x - damping * v
        const springK = 0.15;
        const damping = 0.82;
        const displacement = str.y - str.targetY;
        const force = -springK * displacement;

        str.velocity = (str.velocity + force) * damping;
        str.y += str.velocity;

        const currentY = baseY + str.y;
        const noteFreq = notes[i].freq;

        // Pluck audio trigger on high deflection velocity crossing
        if (Math.abs(str.velocity) > 2.5 && Math.abs(str.y) > 4) {
          playSynthNote(noteFreq, i);
          spawnParticles(width / 2, currentY);
        }

        // Draw string with gradient curve
        ctx.beginPath();
        ctx.moveTo(20, baseY);
        ctx.quadraticCurveTo(width / 2, currentY, width - 20, baseY);

        const activeGlow = Math.min(1, Math.abs(str.y) / 25);
        ctx.strokeStyle = activeGlow > 0.1
          ? (isDark ? `rgba(96, 165, 250, ${0.5 + activeGlow * 0.5})` : `rgba(37, 99, 235, ${0.5 + activeGlow * 0.5})`)
          : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)");
        ctx.lineWidth = 2 + activeGlow * 2;
        ctx.stroke();

        // Draw string anchor dots
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.arc(20, baseY, 3, 0, Math.PI * 2);
        ctx.arc(width - 20, baseY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Note label HUD
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
        ctx.font = "10px monospace";
        ctx.fillText(notes[i].name, 28, baseY - 5);
      });

      // Update & render spark particles
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.92;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const py = e.clientY - rect.top;
    const stringSpacing = rect.height / (notes.length + 1);

    notes.forEach((_, i) => {
      const baseY = stringSpacing * (i + 1);
      const dist = Math.abs(py - baseY);
      if (dist < 18) {
        stringsRef.current[i].velocity = (Math.random() > 0.5 ? 1 : -1) * 14;
        playSynthNote(notes[i].freq, i);
        spawnParticles(e.clientX - rect.left, baseY);
      }
    });
  };

  return (
    <div className="space-y-2 flex flex-col items-center w-full select-none">
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        className="w-full h-48 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 cursor-pointer touch-none"
        style={{ width: "100%", height: "192px" }}
      />
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        Strum or drag across the 5 strings to pluck pentatonic notes
      </span>
    </div>
  );
}

// -----------------------------------------------------------------
// Craft Component 1: Dino Spacebar Runner (Chrome Dino Classic)
// -----------------------------------------------------------------
export function DinoRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const stateRef = useRef({
    dinoY: 0,
    dinoVy: 0,
    isJumping: false,
    groundY: 150,
    score: 0,
    highScore: 0,
    speed: 4.5,
    obstacles: [] as { x: number; w: number; h: number; type: "cactus" | "bird"; y: number }[],
    clouds: [] as { x: number; y: number; speed: number }[],
    frameCount: 0,
    active: true,
  });

  const playSound = (freq: number, duration = 0.08, type: OscillatorType = "sine") => {
    try {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new Ctor();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {}
  };

  const triggerJump = () => {
    const st = stateRef.current;
    if (!st.active) {
      initGame();
      return;
    }
    if (!st.isJumping) {
      st.isJumping = true;
      st.dinoVy = -11.5;
      playSound(540, 0.08, "sine");
    }
  };

  const initGame = () => {
    stateRef.current = {
      dinoY: 0,
      dinoVy: 0,
      isJumping: false,
      groundY: 150,
      score: 0,
      highScore: stateRef.current.highScore,
      speed: 4.5,
      obstacles: [],
      clouds: [
        { x: 100, y: 35, speed: 0.8 },
        { x: 280, y: 25, speed: 0.6 },
      ],
      frameCount: 0,
      active: true,
    };
    setScore(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains("dark");
      const groundY = h - 35;
      const st = stateRef.current;
      st.groundY = groundY;

      // Background Fill
      ctx.fillStyle = isDark ? "rgba(12,12,14,0.96)" : "rgba(248,249,250,0.96)";
      ctx.fillRect(0, 0, w, h);

      if (st.active) {
        st.frameCount++;
        st.score += 0.2;
        setScore(Math.floor(st.score));

        // Speed ramp up
        st.speed = 4.5 + Math.floor(st.score / 200) * 0.4;

        // Dino Physics
        if (st.isJumping) {
          st.dinoY += st.dinoVy;
          st.dinoVy += 0.68; // Gravity
          if (st.dinoY >= 0) {
            st.dinoY = 0;
            st.dinoVy = 0;
            st.isJumping = false;
          }
        }

        // Spawn Obstacles
        if (st.frameCount % Math.max(50, Math.floor(110 - st.speed * 4)) === 0) {
          const type = Math.random() > 0.75 ? "bird" : "cactus";
          st.obstacles.push({
            x: w + 20,
            w: type === "bird" ? 28 : (Math.random() > 0.5 ? 24 : 14),
            h: type === "bird" ? 18 : (Math.random() > 0.5 ? 32 : 26),
            type,
            y: type === "bird" ? groundY - 45 - Math.random() * 20 : groundY,
          });
        }

        // Milestone audio chime
        if (Math.floor(st.score) > 0 && Math.floor(st.score) % 100 === 0 && st.frameCount % 5 === 0) {
          playSound(880, 0.12, "sine");
        }
      }

      // Render Clouds
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
      st.clouds.forEach((c) => {
        if (st.active) c.x -= c.speed;
        if (c.x < -40) c.x = w + 40;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.arc(c.x + 10, c.y - 4, 12, 0, Math.PI * 2);
        ctx.arc(c.x + 22, c.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Ground Line
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();

      // Render Dino (Chrome Dino Vector Style)
      const dinoX = 40;
      const dinoCurrY = groundY - 26 + st.dinoY;
      const legOffset = Math.floor(st.frameCount / 6) % 2 === 0 ? 0 : 3;

      ctx.fillStyle = isDark ? "#ffffff" : "#18181b";
      // Body
      ctx.fillRect(dinoX, dinoCurrY, 20, 20);
      // Head & Eye
      ctx.fillRect(dinoX + 10, dinoCurrY - 10, 16, 12);
      ctx.fillStyle = isDark ? "#0c0c0e" : "#f8f9fa";
      ctx.fillRect(dinoX + 20, dinoCurrY - 8, 3, 3); // Eye dot
      ctx.fillStyle = isDark ? "#ffffff" : "#18181b";
      // Arms & Tail
      ctx.fillRect(dinoX - 5, dinoCurrY + 4, 6, 4);
      ctx.fillRect(dinoX + 16, dinoCurrY + 8, 4, 3);

      // Legs
      if (st.isJumping) {
        ctx.fillRect(dinoX + 4, dinoCurrY + 20, 4, 6);
        ctx.fillRect(dinoX + 12, dinoCurrY + 20, 4, 6);
      } else {
        ctx.fillRect(dinoX + 4, dinoCurrY + 20, 4, 6 - legOffset);
        ctx.fillRect(dinoX + 12, dinoCurrY + 20, 4, 6 + legOffset);
      }

      // Render & Update Obstacles
      st.obstacles.forEach((obs) => {
        if (st.active) obs.x -= st.speed;

        const obsY = obs.type === "cactus" ? obs.y - obs.h : obs.y;

        // Draw Cactus / Bird
        ctx.fillStyle = isDark ? "#10b981" : "#059669";
        if (obs.type === "cactus") {
          ctx.fillRect(obs.x, obsY, obs.w, obs.h);
          ctx.fillRect(obs.x - 4, obsY + 6, 4, 10);
          ctx.fillRect(obs.x + obs.w, obsY + 10, 4, 10);
        } else {
          ctx.fillStyle = isDark ? "#f43f5e" : "#e11d48";
          ctx.fillRect(obs.x, obsY, obs.w, obs.h);
          const wingY = Math.floor(st.frameCount / 8) % 2 === 0 ? -6 : 6;
          ctx.fillRect(obs.x + 8, obsY + wingY, 8, 4);
        }

        // AABB Collision Detection
        if (
          st.active &&
          dinoX + 22 >= obs.x &&
          dinoX <= obs.x + obs.w &&
          dinoCurrY + 24 >= obsY &&
          dinoCurrY <= obsY + obs.h
        ) {
          st.active = false;
          setIsGameOver(true);
          const newHi = Math.max(st.highScore, Math.floor(st.score));
          st.highScore = newHi;
          setHighScore(newHi);
          playSound(150, 0.25, "sawtooth");
        }
      });

      // Cleanup offscreen obstacles
      st.obstacles = st.obstacles.filter((o) => o.x > -50);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none space-y-3 py-1">
      {/* Game Viewport Container */}
      <div
        onClick={triggerJump}
        className="w-full h-56 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 relative overflow-hidden flex flex-col justify-between p-3 cursor-pointer"
      >
        {/* HUD Top Header */}
        <div className="flex items-center justify-between z-10 pointer-events-none font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="text-black/50 dark:text-white/50">
              HI <strong>{String(highScore).padStart(5, "0")}</strong>
            </span>
            <span className="font-bold text-black dark:text-white">
              {String(score).padStart(5, "0")}
            </span>
          </div>

          {isGameOver && (
            <span className="text-rose-500 font-bold tracking-wider animate-pulse">
              GAME OVER
            </span>
          )}
        </div>

        {/* Playable Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Bottom Game Controls */}
        <div className="flex justify-end z-10 w-full pt-1 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              initGame();
            }}
            className="px-3.5 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            {isGameOver ? "PLAY AGAIN" : "RESTART"}
          </button>
        </div>
      </div>

      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        PRESS SPACEBAR / UP ARROW (OR CLICK CANVAS) TO JUMP & DODGE OBSTACLES
      </span>
    </div>
  );
}

// -----------------------------------------------------------------
// Craft Component 2: 3D Interactive Globe
// -----------------------------------------------------------------
export function GravitationalVortex() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef<number>(340);

  // Exact coordinates for Bengaluru, Karnataka, India
  const BENGALURU_LAT = 12.9716;
  const BENGALURU_LNG = 77.5946;

  // Initial rotation centered directly on India (phi = 6.07 rad, theta = -0.23 rad)
  const phiRef = useRef(6.07);
  const thetaRef = useRef(-0.23);
  const velocityRef = useRef({ phi: 0.002, theta: 0 });
  const isPointerDownRef = useRef(false);
  const lastPointerPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let globe: any;

    const init = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width || containerRef.current.offsetWidth || 340;
      widthRef.current = width;

      const isDark = document.documentElement.classList.contains("dark");

      globe = createGlobe(canvasRef.current, {
        width: width * 2,
        height: width * 2,
        devicePixelRatio: 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.5 : 0.6,
        mapSamples: 24000,
        mapBrightness: isDark ? 5.5 : 1.35,
        baseColor: isDark ? [0.14, 0.14, 0.18] : [0.93, 0.93, 0.96],
        markerColor: [0.23, 0.51, 0.96],
        glowColor: isDark ? [0.12, 0.14, 0.18] : [0.94, 0.95, 0.98],
        markers: [
          // Native Cobe glowing blue marker at Bengaluru
          { location: [BENGALURU_LAT, BENGALURU_LNG], size: 0.1 },
        ],
        onRender: (state) => {
          if (!isPointerDownRef.current) {
            phiRef.current += velocityRef.current.phi;
            thetaRef.current += velocityRef.current.theta;

            // Decay velocity to slow idle auto-rotation
            velocityRef.current.phi = velocityRef.current.phi * 0.94 + 0.0018 * 0.06;
            velocityRef.current.theta = velocityRef.current.theta * 0.92;
          }

          // Clamp theta
          thetaRef.current = Math.max(-0.65, Math.min(0.65, thetaRef.current));

          state.phi = phiRef.current;
          state.theta = thetaRef.current;
          state.width = widthRef.current * 2;
          state.height = widthRef.current * 2;
        },
      });

      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    };

    const handleResize = () => {
      if (globe) globe.destroy();
      init();
    };

    init();
    window.addEventListener("resize", handleResize);

    return () => {
      if (globe) globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
      try {
        canvasRef.current.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || !lastPointerPosRef.current) return;

    const deltaX = e.clientX - lastPointerPosRef.current.x;
    const deltaY = e.clientY - lastPointerPosRef.current.y;

    const phiDelta = deltaX * 0.007;
    const thetaDelta = deltaY * 0.005;

    phiRef.current += phiDelta;
    thetaRef.current += thetaDelta;

    // Track fling velocity
    velocityRef.current = {
      phi: phiDelta * 0.85,
      theta: thetaDelta * 0.85,
    };

    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = false;
    lastPointerPosRef.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div className="space-y-3 flex flex-col items-center w-full select-none">
      {/* 3D Globe Frame */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[380px] aspect-square flex items-center justify-center overflow-hidden rounded-2xl"
      >
        {/* WebGL Base Globe Canvas */}
        <canvas
          ref={canvasRef}
          className="opacity-0 transition-opacity duration-700 w-full h-full touch-none"
          style={{
            cursor: "grab",
            contain: "layout paint size",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        {/* Subtle Edge Vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at center, transparent 46%, var(--bg-base, transparent) 82%)",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-black/40 dark:text-white/35 pointer-events-none select-none">
        <span>drag in any direction to spin</span>
        <span className="text-black/20 dark:text-white/20">·</span>
        <span>free inertia</span>
        <span className="text-black/20 dark:text-white/20">·</span>
        <span>bengaluru, india</span>
      </div>
    </div>
  );
}

// Craft Component 3: Acoustic Wave Matrix (Coordinate FM Synth)
// -----------------------------------------------------------------
export function AcousticWaveform() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [active, setActive] = useState(false);
  const [pitch, setPitch] = useState(440);

  const startAudio = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const Ctor = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new Ctor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      if (!oscRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
      }
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0.08, ctx.currentTime, 0.02);
      }
    } catch {}
  };

  const updateAudio = (freq: number) => {
    setPitch(Math.round(freq));
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.02);
    }
  };

  const stopAudio = () => {
    setActive(false);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.04);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const centerY = height / 2;

      ctx.strokeStyle = active
        ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)")
        : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)");
      ctx.lineWidth = active ? 2 : 1;

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const freqRatio = pitch / 300;
        const amp = active ? 35 : 8;
        const y = centerY + Math.sin(x * 0.03 * freqRatio + phase) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += active ? 0.08 : 0.02;
      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [active, pitch]);

  return (
    <div className="space-y-2 flex flex-col items-center w-full select-none">
      <div
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const freq = 200 + x * 600;
          setActive(true);
          startAudio(freq);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!active) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          updateAudio(200 + x * 600);
        }}
        onPointerUp={(e) => {
          stopAudio();
          try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
        }}
        className="w-full h-48 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 relative overflow-hidden flex items-center justify-center cursor-ew-resize touch-none"
      >
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" style={{ width: "100%", height: "192px" }} />
        <div className="absolute top-3 right-4 text-[11px] font-mono text-black/50 dark:text-white/50">
          {active ? `${pitch} Hz` : "DRAG TO SYNTHESIZE"}
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        Click and drag horizontally to control FM oscillator pitch & visual wave frequency
      </span>
    </div>
  );
}

// -----------------------------------------------------------------
// Craft Component 4: Kinetic Compass Engine (Tactile Magnetic 3D Dial)
// -----------------------------------------------------------------
export function KineticCompass() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [angle, setAngle] = useState(42);
  const isDraggingRef = useRef(false);
  const lastAngleRef = useRef(42);

  const playDialTick = () => {
    try {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new Ctor();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(750 + Math.random() * 150, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const cx = w / 2;
      const cy = h / 2;
      const rad = Math.min(w, h) / 2.6;

      // Outer Bezel Ring
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
      ctx.lineWidth = 6;
      ctx.stroke();

      // Inner Dial Rim
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 12, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 360 Degree Ticks & Cardinal Labels
      const ticks = 36;
      const cardinalMap: Record<number, string> = {
        0: "N",
        90: "E",
        180: "S",
        270: "W",
      };

      for (let i = 0; i < ticks; i++) {
        const tickDeg = i * 10;
        const radAngle = ((tickDeg - 90) * Math.PI) / 180;
        const isMajor = tickDeg % 90 === 0;

        const innerR = rad - (isMajor ? 18 : 10);
        const outerR = rad - 6;
        const x1 = cx + Math.cos(radAngle) * innerR;
        const y1 = cy + Math.sin(radAngle) * innerR;
        const x2 = cx + Math.cos(radAngle) * outerR;
        const y2 = cy + Math.sin(radAngle) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isMajor
          ? (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")
          : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)");
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.stroke();

        if (isMajor) {
          const labelR = rad - 28;
          const lx = cx + Math.cos(radAngle) * labelR;
          const ly = cy + Math.sin(radAngle) * labelR;
          ctx.fillStyle = tickDeg === 0 ? "#ef4444" : (isDark ? "#ffffff" : "#000000");
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(cardinalMap[tickDeg] ?? "", lx, ly);
        }
      }

      // Rotating Compass Needle (Points to target angle)
      const needleRadAngle = ((angle - 90) * Math.PI) / 180;
      const needleLen = rad - 22;

      // North Pointer (Red Diamond)
      const nx = cx + Math.cos(needleRadAngle) * needleLen;
      const ny = cy + Math.sin(needleRadAngle) * needleLen;
      const perpAngle = needleRadAngle + Math.PI / 2;
      const px1 = cx + Math.cos(perpAngle) * 6;
      const py1 = cy + Math.sin(perpAngle) * 6;
      const px2 = cx - Math.cos(perpAngle) * 6;
      const py2 = cy - Math.sin(perpAngle) * 6;

      ctx.fillStyle = "#ef4444"; // Crimson North
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px1, py1);
      ctx.lineTo(nx, ny);
      ctx.lineTo(px2, py2);
      ctx.closePath();
      ctx.fill();

      // South Pointer (Slate/White Diamond)
      const sx = cx - Math.cos(needleRadAngle) * needleLen;
      const sy = cy - Math.sin(needleRadAngle) * needleLen;

      ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px1, py1);
      ctx.lineTo(sx, sy);
      ctx.lineTo(px2, py2);
      ctx.closePath();
      ctx.fill();

      // Center Brass Cap
      ctx.fillStyle = isDark ? "#ffffff" : "#18181b";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isDark ? "#000000" : "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      // HUD Readout Text
      const getCardinalStr = (deg: number) => {
        const d = (deg % 360 + 360) % 360;
        if (d >= 337.5 || d < 22.5) return "N";
        if (d >= 22.5 && d < 67.5) return "NE";
        if (d >= 67.5 && d < 112.5) return "E";
        if (d >= 112.5 && d < 157.5) return "SE";
        if (d >= 157.5 && d < 202.5) return "S";
        if (d >= 202.5 && d < 247.5) return "SW";
        if (d >= 247.5 && d < 292.5) return "W";
        return "NW";
      };

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [angle]);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;

    let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    if (Math.abs(deg - lastAngleRef.current) > 6) {
      playDialTick();
      lastAngleRef.current = deg;
    }
    setAngle(deg);
  };

  const currentCardinal = (() => {
    const d = (angle % 360 + 360) % 360;
    if (d >= 337.5 || d < 22.5) return "N";
    if (d >= 22.5 && d < 67.5) return "NE";
    if (d >= 67.5 && d < 112.5) return "E";
    if (d >= 112.5 && d < 157.5) return "SE";
    if (d >= 157.5 && d < 202.5) return "S";
    if (d >= 202.5 && d < 247.5) return "SW";
    if (d >= 247.5 && d < 292.5) return "W";
    return "NW";
  })();

  return (
    <div className="space-y-2 flex flex-col items-center w-full select-none">
      <div className="w-full h-48 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 relative overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDraggingRef.current = true;
            handlePointer(e);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (isDraggingRef.current) handlePointer(e);
          }}
          onPointerUp={(e) => {
            isDraggingRef.current = false;
            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
          }}
          className="w-full h-full cursor-pointer touch-none"
          style={{ width: "100%", height: "192px" }}
        />

        {/* HUD Top Badge */}
        <div className="absolute top-3 right-4 font-mono text-[11px] text-black/60 dark:text-white/60 font-semibold space-x-2 pointer-events-none">
          <span>{String(Math.round(angle)).padStart(3, "0")}Â° {currentCardinal}</span>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        Drag around the compass dial to adjust magnetic heading orientation
      </span>
    </div>
  );
}

// -----------------------------------------------------------------
// Craft Component 5: Pixel Rain (Matrix Column Burst)
// -----------------------------------------------------------------
export function PixelRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const lastSoundRef = useRef(0);

  const playGlitchTone = (colIdx: number) => {
    const nowMs = Date.now();
    if (nowMs - lastSoundRef.current < 70) return;
    lastSoundRef.current = nowMs;
    try {
      if (!audioCtxRef.current) {
        const Ctor = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new Ctor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180 + colIdx * 25, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const fontSize = 12;
    const cols = Math.floor(w / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = "ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½01010110";
    let frame = 0;

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      const mouse = mouseRef.current;

      drops.forEach((y, i) => {
        const isCursorCol = mouse && Math.abs(i * fontSize + fontSize / 2 - mouse.x) < fontSize * 2;
        const alpha = isCursorCol ? 1 : 0.5;
        const color = isDark
          ? `rgba(255,255,255,${alpha})`
          : `rgba(0,0,0,${alpha})`;
        const headColor = isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)";

        // Head character (bright)
        ctx.fillStyle = headColor;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)] ?? "0", i * fontSize, y * fontSize);

        // Trail
        ctx.fillStyle = color;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)] ?? "1", i * fontSize, (y - 1) * fontSize);

        // Reset drop
        if (y * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
          if (isCursorCol) playGlitchTone(i % 8);
        } else {
          drops[i] = y + (isCursorCol ? 0.9 : 0.35);
        }
      });

      frame++;
      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-2 flex flex-col items-center w-full select-none">
      <canvas
        ref={canvasRef}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }}
        onPointerLeave={() => { mouseRef.current = null; }}
        className="w-full h-48 rounded-xl bg-black/[0.02] dark:bg-black border border-black/10 dark:border-white/10 cursor-crosshair touch-none"
        style={{ width: "100%", height: "192px" }}
      />
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        Hover over columns to accelerate matrix rain & trigger ambient glitch tones
      </span>
    </div>
  );
}
