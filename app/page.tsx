"use client";

import { useEffect, useState } from "react";

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

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const { timeText, showBelgium } = useFlippingClock();

  useEffect(() => {
    setParticles(generateParticles(35));
    requestAnimationFrame(() => setMounted(true));
  }, []);

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
          className="particle"
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
        </div>
      </div>

      {/* Scanlines overlay for extra vibe */}
      <div className="vibe-overlay" />
    </div>
  );
}
