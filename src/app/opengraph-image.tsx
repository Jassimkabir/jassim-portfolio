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
          background: "#060912",
          color: "#eaf1ff",
          fontFamily: "sans-serif",
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
            color: "#7e8aa6",
          }}
        >
          <div style={{ width: 48, height: 2, background: "#3b82f6" }} />
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
          <span style={{ color: "#3b82f6" }}>
            {CONTENT.name.split(" ").slice(-1).join(" ")}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span style={{ color: "#22d3ee" }}>{CONTENT.contact.email}</span>
          <span style={{ color: "#7e8aa6" }}>Building digital experiences that move</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
