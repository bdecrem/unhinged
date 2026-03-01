"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const features = [
  "be in touch but out of reach",
  "rate his audacity",
  "start over, better",
  "find your girls",
  "level the f*ck up",
  "let go of rats dragging you down",
  "decenter men",
  "track your glow up",
  "set your intentions",
  "build your vision board",
  "manifest your next chapter",
  "rate your situationships",
  "share your era",
  "make lists",
];

function FeatureTicker() {
  const [index, setIndex] = useState(0);
  const slotRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % features.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (measureRef.current && slotRef.current) {
      const w = measureRef.current.offsetWidth;
      slotRef.current.style.width = `${w + 32}px`;
    }
  }, [index]);

  return (
    <div className="ticker-wrap">
      <span className="ticker-label">built to</span>
      <div className="ticker-slot" ref={slotRef}>
        <span key={index} className="ticker-item">{features[index]}</span>
      </div>
      {/* hidden measurer */}
      <span className="ticker-measure" ref={measureRef} aria-hidden="true">
        {features[index]}
      </span>
    </div>
  );
}

function IPhoneScreen() {
  return (
    <div className="iphone-frame">
      <div className="iphone-island" />
      <div className="iphone-screen-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/legally.jpg" alt="" className="iphone-wallpaper" />
        <div className="iphone-overlay" />
        <div className="iphone-gwr-cover">
          <span className="iphone-gwr-text">unhinged</span>
        </div>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    return <p className="waitlist-success">you&apos;re on the list ✓</p>;
  }

  return (
    <form onSubmit={submit} className="waitlist-form">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your email"
        className="waitlist-input"
        required
      />
      <button type="submit" className="waitlist-btn" disabled={status === "loading"}>
        {status === "loading" ? "..." : "join waitlist"}
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="scene">

      <Link href="/" className="site-logo-wrap">
        <span className="site-name">
          <span className="logo-un">un</span>hin<span className="logo-g">g</span>ed.
        </span>
      </Link>

      <nav className="top-nav">
        <Link href="/mission" className="nav-link">my mission</Link>
        <Link href="/about" className="nav-link">about</Link>
      </nav>

      {/* ── Section 1: Hero ── */}
      <section className="hero-section">
        <h1 className="hero-title">
          <span className="hero-un">un</span>hin<span className="drunk-letter">g</span>ed.
        </h1>
        <p className="hero-tagline">
          your most iconic<br />act of self love.
        </p>
        <FeatureTicker />
      </section>

      {/* ── Section 2: iPhone + Waitlist ── */}
      <section className="iphone-section">
        <IPhoneScreen />
        <div className="waitlist-column">
          <p className="waitlist-column-label">be first or whatever.</p>
          <WaitlistForm />
        </div>
      </section>


    </div>
  );
}
