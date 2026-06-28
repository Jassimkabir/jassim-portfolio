import { Grain, Cursor, Loader, Nav, MobileMenu } from "@/components/Chrome";
import {
  Hero,
  Marquee,
  About,
  Terminal,
  Services,
  Work,
  Experience,
  Stats,
  Contact,
  Footer,
} from "@/components/Sections";
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

      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Terminal />
        <Services />
        <Work />
        <Experience />
        <Stats />
        <Contact />
      </main>

      <Footer />

      <Effects />
      <EasterEggs />
    </>
  );
}
