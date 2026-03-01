"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Mission() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  return (
    <div className="mission-scene">
      <Link href="/" className="mission-back">← back</Link>

      <div className={`mission-content ${mounted ? "mission-visible" : ""}`}>
        <p className="mission-label">my mission</p>
        <h1 className="mission-heading">my mission</h1>
        <div className="mission-divider" />
        <p className="mission-body">
          to build things that make people feel something.<br />
          to stay curious, stay weird, stay kind.<br />
          to show up authentically and fully aligned with my vision.
        </p>
      </div>
    </div>
  );
}
