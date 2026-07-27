import { Grain, Cursor, Loader, Nav, MobileMenu } from "@/components/Chrome";
import {
  Nameplate,
  FrontPage,
  Breaking,
  Editorial,
  Features,
  TechStack,
  Chronicle,
  Numbers,
  Classifieds,
  Correspondence,
  Colophon,
} from "@/components/Sections";
import Crossword from "@/components/Crossword";
import Terminal from "@/components/Terminal";
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
        <Breaking />
        <Editorial />
        <Features />
        <TechStack />
        <Chronicle />
        <Numbers />
        <Classifieds />
        <Crossword />
        <Terminal />
        <Correspondence />
      </main>

      <Colophon />

      <Effects />
      <EasterEggs />
    </>
  );
}
