"use client";

import { useEffect, useState, useCallback } from "react";

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

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const [confetti, setConfetti] = useState<ConfettiBit[]>([]);
  const [newlyCollected, setNewlyCollected] = useState<string | null>(null);
  const { timeText, showBelgium } = useFlippingClock();

  useEffect(() => {
    setParticles(generateParticles(35));
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleParticleClick = useCallback((p: Particle, e: React.MouseEvent) => {
    if (poppedIds.has(p.id)) return;

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
      setCollected((prev) => new Set(prev).add(p.emoji));
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
  }, [poppedIds]);

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
        </div>
      </div>

      {/* Scanlines overlay for extra vibe */}
      <div className="vibe-overlay" />
    </div>
  );
}
