import { Grain, Cursor, Loader, Nav, MobileMenu, ChannelBug } from "@/components/Chrome";
import {
  Hero,
  Marquee,
  About,
  Services,
  Work,
  Experience,
  Stats,
  Contact,
  Footer,
} from "@/components/Sections";
import Skills from "@/components/Skills";
import TerminalLive from "@/components/TerminalLive";
import Arcade from "@/components/Arcade";
import FloatingGlyphs from "@/components/FloatingGlyphs";
import Effects from "@/components/Effects";
import EasterEggs from "@/components/EasterEggs";

export default function Home() {
  return (
    <>
      <FloatingGlyphs />
      <Grain />
      <Cursor />
      <ChannelBug />
      <Loader />
      <Nav />
      <MobileMenu />

      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <TerminalLive />
        <Services />
        <Work />
        <Experience />
        <Stats />
        <Contact />
      </main>

      <Footer />

      {/* hidden Snake — opens as a retro popup only when you type `play` */}
      <Arcade />

      <Effects />
      <EasterEggs />
    </>
  );
}
