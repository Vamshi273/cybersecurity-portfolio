import { useState } from 'react';

import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MinimalPreloader from './components/MinimalPreloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#05080d] text-white selection:bg-sky-400 selection:text-black">

      {/* Cinematic Preloader */}
      {loading && (
        <MinimalPreloader onComplete={() => setLoading(false)} />
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Portfolio Sections */}
      <Hero />

      <About />

      {/* Education & Certifications */}
      <Education />

      <Expertise />

      {/* Skills & Expertise */}
      <Skills />

      {/* Projects Archive */}
      <Projects />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

    </main>
  );
}

export default App;

