"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  return (
    <div className="mission-scene">
      <Link href="/" className="mission-back">← back</Link>

      <div className={`mission-content ${mounted ? "mission-visible" : ""}`}>
        <p className="mission-label">the story</p>
        <h1 className="mission-heading">unhinged</h1>
        <div className="mission-divider" />
        <p className="mission-body">
          it started as a joke between two friends —<br />
          bart &amp; rani, at a table, a little too caffeinated,<br />
          trying to build something that felt <em>real</em>.<br />
          <br />
          not polished. not perfect.<br />
          just honest, weird, and fully us.<br />
          <br />
          <em>unhinged</em> is what happens when you stop<br />
          waiting to be ready and just start.
        </p>
      </div>
    </div>
  );
}
