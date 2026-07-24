import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT } from "@/content/site";

export const metadata: Metadata = {
  title: "404 — This Edition Was Never Printed",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 0",
        textAlign: "center",
      }}
    >
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="folio" style={{ marginBottom: 24 }}>
          <span className="kicker">Late Correction</span>
          <span>{CONTENT.paper.title}</span>
          <span className="folio-page">Page ∅</span>
        </div>
        <p
          style={{
            fontFamily: "var(--masthead)",
            fontSize: "clamp(80px, 20vw, 200px)",
            lineHeight: 1,
            color: "var(--red)",
          }}
        >
          404
        </p>
        <h1
          className="section-title"
          style={{ marginTop: 8 }}
        >
          This <em>Edition</em> Was Never Printed
        </h1>
        <div className="section-rule" style={{ margin: "18px 0 28px" }} />
        <p
          className="dropcap"
          style={{
            fontFamily: "var(--body)",
            fontSize: 17,
            lineHeight: 1.7,
            textAlign: "left",
            maxWidth: 46,
            margin: "0 auto",
            color: "var(--ink-soft)",
            display: "inline-block",
          }}
        >
          Our archivists searched the morgue high and low, but the page you
          requested appears to have been spiked by the Editor. It may have
          missed the deadline, or perhaps it never made the run at all.
        </p>
        <div style={{ marginTop: 32 }}>
          <Link
            href="/"
            className="corr-socials"
            style={{
              fontFamily: "var(--gothic)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: 13,
              border: "1px solid var(--rule)",
              padding: "12px 24px",
              display: "inline-block",
            }}
          >
            ← Return to the Front Page
          </Link>
        </div>
      </div>
    </main>
  );
}
