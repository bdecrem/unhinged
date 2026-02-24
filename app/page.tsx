"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const EMOJIS = ["✨", "🌟", "💫", "🦄", "🌈", "💎", "🔥", "⭐", "🪩", "🎉", "🤘", "😎"];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  animDuration: number;
  animDelay: number;
  size: number;
  drift: number;
}

interface ConfettiBit {
  id: number;
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
}

interface CheckIn {
  id: string;
  timestamp: number;
  message: string;
}

const FORTUNE_MESSAGES = [
  "You're doing amazing sweetie ✨",
  "The universe just winked at you",
  "Main character energy detected",
  "Your vibe is immaculate today",
  "Someone is thinking about you rn",
  "Plot twist: you're the plot twist",
  "Slay mode: activated",
  "The stars literally aligned for this moment",
  "You radiate unhinged joy",
  "Certified iconic behavior",
  "Today's forecast: 100% that person",
  "You just leveled up (trust)",
  "Chaos but make it cute",
  "You're someone's reason to smile today",
  "Manifesting big things for you rn",
  "Je bent een zonnestraaltje ☀️",
  "De sterren staan in jouw voordeel",
  "Vandaag wordt een topdag, trust",
  "Je uitstraling is *chef's kiss*",
  "Iemand denkt nu aan jou 💭",
  "Gekke dansen in de keuken energy",
  "Je bent letterlijk magic",
  "Knuffel van het universum incoming",
  "Alles komt goed shat",
  "Je glow-up is niet te stoppen",
  "Wafels verdien je elke dag",
  "Het universum zegt: jij bent top",
  "Chaotisch maar op een cute manier",
  "Je bent iemands favoriete mens",
  "Groot geluk in kleine momentjes 🌸",
];

const CONFETTI_COLORS = ["#ff1493", "#ff69b4", "#ffd700", "#00ffff", "#ff6ec7", "#fff", "#ff007f", "#7fff00"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    left: Math.random() * 100,
    animDuration: 4 + Math.random() * 8,
    animDelay: Math.random() * -12,
    size: 16 + Math.random() * 28,
    drift: -50 + Math.random() * 100,
  }));
}

function useFlippingClock() {
  const [showBelgium, setShowBelgium] = useState(false);
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      if (!showBelgium) {
        const formatted = now.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
          weekday: "long",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTimeText(`${formatted} — Palo Alto, CA`);
      } else {
        const formatted = now.toLocaleString("nl-BE", {
          timeZone: "Europe/Brussels",
          weekday: "long",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeText(`${formatted} — België`);
      }
    }
    update();
    const tick = setInterval(update, 1000);
    return () => clearInterval(tick);
  }, [showBelgium]);

  useEffect(() => {
    const flip = setInterval(() => setShowBelgium((b) => !b), 5000);
    return () => clearInterval(flip);
  }, []);

  return { timeText, showBelgium };
}

let confettiIdCounter = 0;

function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);
  const collectCountRef = useRef(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }, []);

  const playPop = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Rising pitch based on how many collected — gets more exciting
    const baseFreq = 600 + collectCountRef.current * 80;
    collectCountRef.current++;

    // Main pop tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.25);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    // Sparkle overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(baseFreq * 2.5, now + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 3.5, now + 0.12);
    gain2.gain.setValueAtTime(0.12, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now + 0.03);
    osc2.stop(now + 0.15);
  }, [getCtx]);

  const playVictory = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const t = now + i * 0.15;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }, [getCtx]);

  const playCheckIn = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Warm chime — two gentle tones
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.15);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Soft harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1320, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.3);
    gain2.gain.setValueAtTime(0.1, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.5);
  }, [getCtx]);

  return { playPop, playVictory, playCheckIn };
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const [confetti, setConfetti] = useState<ConfettiBit[]>([]);
  const [newlyCollected, setNewlyCollected] = useState<string | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [showLog, setShowLog] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const { timeText, showBelgium } = useFlippingClock();
  const { playPop, playVictory, playCheckIn } = useSoundEffects();

  useEffect(() => {
    setParticles(generateParticles(35));
    requestAnimationFrame(() => setMounted(true));
    try {
      const stored = localStorage.getItem("unhinged-checkins");
      if (stored) setCheckIns(JSON.parse(stored));
    } catch {}
  }, []);

  const handleParticleClick = useCallback((p: Particle, e: React.MouseEvent) => {
    if (poppedIds.has(p.id)) return;

    // Play pop sound immediately on tap
    playPop();

    // Mark as popped
    setPoppedIds((prev) => new Set(prev).add(p.id));

    // Spawn confetti at click point
    const bits: ConfettiBit[] = Array.from({ length: 12 }, (_, i) => {
      const angle = ((360 / 12) * i + Math.random() * 30) * (Math.PI / 180);
      const distance = 40 + Math.random() * 60;
      return {
        id: confettiIdCounter++,
        x: e.clientX,
        y: e.clientY,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      };
    });
    setConfetti((prev) => [...prev, ...bits]);

    // After animation, collect and remove
    setTimeout(() => {
      setCollected((prev) => {
        const next = new Set(prev).add(p.emoji);
        if (next.size === EMOJIS.length && prev.size !== EMOJIS.length) {
          setTimeout(() => playVictory(), 100);
        }
        return next;
      });
      setNewlyCollected(p.emoji);
      setTimeout(() => setNewlyCollected(null), 600);
      setParticles((prev) => prev.filter((pp) => pp.id !== p.id));
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.delete(p.id);
        return next;
      });
    }, 450);

    // Clean up confetti
    setTimeout(() => {
      const bitIds = new Set(bits.map((b) => b.id));
      setConfetti((prev) => prev.filter((c) => !bitIds.has(c.id)));
    }, 800);
  }, [poppedIds, playPop, playVictory]);

  const handleCheckIn = useCallback(() => {
    // If log is showing, just collapse it
    if (showLog) {
      setShowLog(false);
      return;
    }

    // Otherwise, check in and show log
    playCheckIn();
    setBouncing(true);
    setTimeout(() => setBouncing(false), 500);

    const lastMsg = checkIns.length > 0 ? checkIns[0].message : "";
    let msg: string;
    do {
      msg = FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)];
    } while (msg === lastMsg && FORTUNE_MESSAGES.length > 1);

    const entry: CheckIn = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      message: msg,
    };
    const updated = [entry, ...checkIns];
    setCheckIns(updated);
    setShowLog(true);
    try {
      localStorage.setItem("unhinged-checkins", JSON.stringify(updated));
    } catch {}
  }, [checkIns, showLog, playCheckIn]);

  function formatCheckInTime(ts: number): string {
    const d = new Date(ts);
    const day = d.toLocaleDateString("nl-BE", { timeZone: "Europe/Brussels", day: "numeric", month: "numeric" });
    const time = d.toLocaleTimeString("nl-BE", { timeZone: "Europe/Brussels", hour: "2-digit", minute: "2-digit", hour12: false });
    return `${day} ${time}`;
  }

  const allCollected = collected.size === EMOJIS.length;

  return (
    <div className="scene">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Floating emoji particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${poppedIds.has(p.id) ? "particle-popped" : ""}`}
          onClick={(e) => handleParticleClick(p, e)}
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.animDuration}s`,
            animationDelay: `${p.animDelay}s`,
            fontSize: `${p.size}px`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Confetti bursts */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-bit"
          style={{
            left: c.x,
            top: c.y,
            background: c.color,
            ["--dx" as string]: `${c.dx}px`,
            ["--dy" as string]: `${c.dy}px`,
          }}
        />
      ))}

      {/* Main content */}
      <div className={`content ${mounted ? "content-visible" : ""}`}>
        <div className="greeting-card">
          <div className="sparkle-ring" />
          <p className="hey-text">hey hey hey</p>
          <h1 className="main-text">
            <span className="hello-word">Hello</span>
            <span className="name-word">Rani</span>
          </h1>
          <div className="divider" />
          <p className="from-text" key={showBelgium ? "be" : "us"}>
            {timeText}
          </p>

          {/* Collection tray */}
          <div className="collection-tray">
            <div className="collection-slots">
              {EMOJIS.map((emoji) => (
                <div
                  key={emoji}
                  className={`collection-slot ${collected.has(emoji) ? "slot-filled" : ""} ${newlyCollected === emoji ? "slot-pop" : ""}`}
                >
                  <span className="slot-emoji">{emoji}</span>
                </div>
              ))}
            </div>
            <p className="collection-count">
              {collected.size} / {EMOJIS.length}
            </p>
            {allCollected && (
              <p className="collection-complete">you caught them all! ✨</p>
            )}
          </div>

          {/* Check-in section */}
          <div className="checkin-section">
            <button
              className={`checkin-button ${bouncing ? "checkin-bounce" : ""}`}
              onClick={handleCheckIn}
            >
              🫶
            </button>

            {checkIns.length > 0 && showLog && (
                  <div className="checkin-log">
                    {checkIns.map((entry, i) => (
                      <div
                        key={entry.id}
                        className="checkin-entry"
                        style={{ animationDelay: `${i * 0.04}s` }}
                      >
                        <span className="checkin-time">
                          {formatCheckInTime(entry.timestamp)}
                        </span>
                        <span className="checkin-message">{entry.message}</span>
                      </div>
                    ))}
                  </div>
            )}
          </div>
        </div>
      </div>

      {/* Scanlines overlay for extra vibe */}
      <div className="vibe-overlay" />
    </div>
  );
}
