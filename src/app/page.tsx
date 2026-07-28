import { SiteProvider } from '@/components/SiteProvider';
import { PageLoader } from '@/components/chrome/PageLoader';
import { Header } from '@/components/chrome/Header';
import { NavMenu } from '@/components/chrome/NavMenu';
import { RequestModal } from '@/components/chrome/RequestModal';
import { GrainOverlay } from '@/components/chrome/GrainOverlay';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { About } from '@/components/sections/About';
import { Terminal } from '@/components/sections/Terminal';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Stats } from '@/components/sections/Stats';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <SiteProvider>
      <PageLoader />
      <Header />

      <main id="main">
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

      <NavMenu />
      <RequestModal />
      <GrainOverlay />
    </SiteProvider>
  );
}
