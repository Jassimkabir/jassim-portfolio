import { ImageResponse } from "next/og";
import { CONTENT } from "@/content/site";

export const alt = `${CONTENT.paper.title} — ${CONTENT.name}, ${CONTENT.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { paper, lead, role } = CONTENT;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          background: "#ece0c6",
          color: "#211b12",
          fontFamily: "serif",
        }}
      >
        {/* folio bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#574c39",
            borderBottom: "2px solid #211b12",
            paddingBottom: 12,
          }}
        >
          <span>{paper.edition}</span>
          <span>{paper.established}</span>
          <span style={{ color: "#97281d" }}>{paper.price}</span>
        </div>

        {/* nameplate */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 118,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            padding: "26px 0 18px",
            borderBottom: "4px solid #211b12",
          }}
        >
          {paper.title}
        </div>

        {/* lead headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 34,
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 24,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#97281d",
            }}
          >
            {lead.kicker}
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.02,
              marginTop: 14,
            }}
          >
            Developer Builds Digital Worlds That Move
          </span>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            borderTop: "2px solid #211b12",
            paddingTop: 16,
            color: "#574c39",
          }}
        >
          <span style={{ fontStyle: "italic" }}>{paper.slogan}</span>
          <span>
            {CONTENT.name} · {role}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
