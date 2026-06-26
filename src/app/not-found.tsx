import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT } from "@/content/site";

export const metadata: Metadata = {
  title: "404 — command not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const { user, host } = CONTENT.terminal;
  const prompt = (
    <>
      <span className="term-user">
        {user}@{host}
      </span>
      <span className="term-path">:~</span>
      <span className="term-dollar">$</span>
    </>
  );

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 0",
      }}
    >
      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="term" style={{ width: "min(680px, 100%)", margin: 0 }}>
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term-title">{user}@{host}: ~/404</span>
          </div>
          <div className="term-body" style={{ lineHeight: 2 }}>
            <p className="term-prompt">
              {prompt}
              <span className="term-cmd">cd ./the-page-you-wanted</span>
            </p>
            <p style={{ color: "var(--coral)", margin: "2px 0 14px" }}>
              bash: cd: no such file or directory — error 404
            </p>
            <p className="term-prompt">
              {prompt}
              <span className="term-cmd">whereis it</span>
            </p>
            <p className="term-out">honestly? no idea. but home is still standing. ✦</p>
            <p className="term-prompt" style={{ marginTop: 6 }}>
              {prompt}{" "}
              <Link href="/" className="term-cmd" style={{ color: "var(--lime)" }}>
                ./go-home
              </Link>
              <span className="term-blink" aria-hidden="true">
                ▮
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
