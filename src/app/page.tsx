import { existsSync } from 'node:fs';
import path from 'node:path';

import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Proof from '@/components/sections/Proof';
import Capabilities from '@/components/sections/Capabilities';
import Work from '@/components/sections/Work';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Numbers from '@/components/sections/Numbers';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  /*
   * The portrait is the centrepiece and it has not been supplied yet. Checking
   * for it here rather than hardcoding a flag means the hero starts working
   * the moment the file is dropped into /public, with no code change.
   */
  const hasPortrait = existsSync(path.join(process.cwd(), 'public', 'portrait.png'));

  return (
    <>
      <Nav />
      <main id="main">
        {/* Anchors are preserved from the previous site so existing deep links
            still land. Two are deliberately stale: #terminal now holds Proof,
            #services now holds Capabilities. Do not rename either. */}
        <Hero hasPortrait={hasPortrait} />
        <Marquee />
        <About />
        <Proof />
        <Capabilities />
        <Work />
        <Experience />
        <Education />
        <Numbers />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
