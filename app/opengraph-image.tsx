import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Kyle Reginaldo, Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#111111",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(248,255,59,0.22), transparent 55%), radial-gradient(circle at 8% 92%, rgba(248,255,59,0.12), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#34d399",
            }}
          />
          <span style={{ fontSize: 26, color: "#a8aab2", letterSpacing: 2, textTransform: "uppercase" }}>
            Available for work
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: "#ffffff", letterSpacing: -2 }}>
          Kyle Reginaldo
        </div>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 500, color: "#F8FF3B", marginTop: 8 }}>
          Software Engineer
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#888888", marginTop: 28, maxWidth: 900 }}>
          Mobile apps, web platforms, and the backend systems behind them.
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {["Flutter", "Next.js", "NestJS", "TypeScript"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#F5F5F5",
                border: "1px solid #333333",
                borderRadius: 999,
                padding: "8px 22px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
