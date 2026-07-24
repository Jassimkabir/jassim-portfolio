import { ImageResponse } from "next/og";
import { CONTENT } from "@/content/site";

export const alt = `${CONTENT.name} — ${CONTENT.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0f",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 6px)",
          color: "#eef1f7",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7a8194",
          }}
        >
          <div style={{ width: 20, height: 20, background: "#ff45a6" }} />
          {CONTENT.role}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          <span>{CONTENT.name.split(" ").slice(0, -1).join(" ") || CONTENT.name}</span>
          <span style={{ color: "#ffcf3a" }}>
            {CONTENT.name.split(" ").slice(-1).join(" ")}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span style={{ color: "#46d9ff" }}>{CONTENT.contact.email}</span>
          <span style={{ color: "#7a8194" }}>Building digital experiences that move</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
