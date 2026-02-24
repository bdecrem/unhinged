import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hello Rani!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ff1493, #ff007f, #ff6ec7, #ff69b4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            top: -100,
            left: -100,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            bottom: -80,
            right: -60,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            top: 60,
            right: 200,
          }}
        />

        {/* Scattered emojis */}
        {["✨", "🦄", "🔥", "🌈", "🪩", "🎉", "😎", "💎"].map(
          (emoji, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                fontSize: 40 + (i % 3) * 12,
                opacity: 0.6,
                top: `${10 + ((i * 37) % 80)}%`,
                left: `${5 + ((i * 43) % 90)}%`,
              }}
            >
              {emoji}
            </div>
          )
        )}

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            padding: "48px 80px",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            hey hey hey
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 300,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Hello
            </span>
            <span
              style={{
                fontSize: 88,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Rani
            </span>
          </div>
          <div
            style={{
              width: 120,
              height: 3,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              borderRadius: 2,
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            unhinged.fyi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
