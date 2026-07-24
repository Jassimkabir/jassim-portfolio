import { Grain, Cursor, Loader, Nav, MobileMenu } from "@/components/Chrome";
import {
  Nameplate,
  FrontPage,
  Ticker,
  Editorial,
  Wire,
  Services,
  Dispatches,
  Chronicle,
  Numbers,
  Classifieds,
  Correspondence,
  Colophon,
} from "@/components/Sections";
import Crossword from "@/components/Crossword";
import FloatingGlyphs from "@/components/FloatingGlyphs";
import Effects from "@/components/Effects";
import EasterEggs from "@/components/EasterEggs";

export default function Home() {
  return (
    <>
      <FloatingGlyphs />
      <Grain />
      <Cursor />
      <Loader />
      <Nav />
      <MobileMenu />

      <main>
        <Nameplate />
        <FrontPage />
        <Ticker />
        <Editorial />
        <Wire />
        <Services />
        <Dispatches />
        <Chronicle />
        <Numbers />
        <Classifieds />
        <Crossword />
        <Correspondence />
      </main>

      <Colophon />

      <Effects />
      <EasterEggs />
    </>
  );
}
