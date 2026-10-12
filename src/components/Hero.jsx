import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const securityRoles = [
'SOC ANALYST',
'THREAT DETECTION',
'INCIDENT RESPONSE',
'ETHICAL HACKING',
];

export default function Hero() {
const sectionRef = useRef(null);
const cardRef = useRef(null);
const glareRef = useRef(null);
const spotlightRef = useRef(null);
const contentRef = useRef(null);

useEffect(() => {
const section = sectionRef.current;
const card = cardRef.current;
const content = contentRef.current;


if (!section || !card || !content) return;

const context = gsap.context(() => {
  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  timeline
    .fromTo(
      '.hero-nav',
      { y: -25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
    .fromTo(
      '.hero-anim-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
      },
      '-=0.35'
    )
    .fromTo(
      card,
      {
        opacity: 0,
        scale: 0.85,
        rotationY: 12,
        rotationX: -8,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.65'
    );
}, section);

const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!finePointer || reducedMotion) {
  return () => context.revert();
}

const moveCard = gsap.quickTo(card, 'rotationY', {
  duration: 0.35,
  ease: 'power2.out',
});

const tiltCard = gsap.quickTo(card, 'rotationX', {
  duration: 0.35,
  ease: 'power2.out',
});

const moveGlareX = glareRef.current
  ? gsap.quickTo(glareRef.current, 'x', {
      duration: 0.3,
      ease: 'power2.out',
    })
  : null;

const moveGlareY = glareRef.current
  ? gsap.quickTo(glareRef.current, 'y', {
      duration: 0.3,
      ease: 'power2.out',
    })
  : null;

function handleMouseMove(event) {
  const sectionRect = section.getBoundingClientRect();

  const x = event.clientX - sectionRect.left;
  const y = event.clientY - sectionRect.top;

  if (spotlightRef.current) {
    spotlightRef.current.style.transform =
      'translate3d(' +
      (x - 300) +
      'px, ' +
      (y - 300) +
      'px, 0)';
  }

  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const rotateY =
    ((event.clientX - centerX) / (rect.width / 2)) * 8;

  const rotateX =
    -((event.clientY - centerY) / (rect.height / 2)) * 8;

  moveCard(Math.max(-8, Math.min(8, rotateY)));
  tiltCard(Math.max(-8, Math.min(8, rotateX)));

  if (moveGlareX && moveGlareY) {
    moveGlareX((event.clientX - rect.left - rect.width / 2) * 0.15);
    moveGlareY((event.clientY - rect.top - rect.height / 2) * 0.15);
  }

  if (spotlightRef.current) {
    spotlightRef.current.style.opacity = '1';
  }
}

function resetEffects() {
  moveCard(0);
  tiltCard(0);

  if (spotlightRef.current) {
    spotlightRef.current.style.opacity = '0';
  }
}

section.addEventListener('mousemove', handleMouseMove);
section.addEventListener('mouseleave', resetEffects);

return () => {
  section.removeEventListener('mousemove', handleMouseMove);
  section.removeEventListener('mouseleave', resetEffects);
  context.revert();
};


}, []);

return ( <section
   id="home"
   ref={sectionRef}
   className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#05080d] text-white"
 >
{/* Background atmosphere */}
<div
aria-hidden="true"
className="pointer-events-none absolute inset-0"
style={{
background:
'radial-gradient(ellipse at 70% 45%, rgba(14,165,233,0.10), transparent 42%), radial-gradient(ellipse at 15% 80%, rgba(16,185,129,0.07), transparent 38%)',
}}
/>

  {/* Background grid */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.12]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(56,189,248,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.16) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
      maskImage:
        'linear-gradient(to bottom, black, transparent 90%)',
    }}
  />

  {/* Ambient mouse spotlight */}
  <div
    ref={spotlightRef}
    aria-hidden="true"
    className="pointer-events-none absolute left-0 top-0 z-10 h-[600px] w-[600px] rounded-full opacity-0 blur-[100px]"
    style={{
      background:
        'radial-gradient(circle, rgba(56,189,248,0.16), rgba(16,185,129,0.06) 40%, transparent 70%)',
    }}
  />

  {/* Navigation */}
  <header className="hero-nav relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-12">
    <a
      href="#home"
      className="flex items-center gap-3"
      aria-label="Go to homepage"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 font-mono text-sm font-black text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.12)]">
        A.
      </span>

      <span className="text-sm font-bold tracking-[0.18em]">
        CYBER<span className="text-sky-400">SEC</span>
      </span>
    </a>

    <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:flex">
      <a href="#home" className="transition-colors hover:text-sky-300">
        Home
      </a>
      <a href="#about" className="transition-colors hover:text-sky-300">
        About
      </a>
      <a href="#expertise" className="transition-colors hover:text-sky-300">
        Expertise
      </a>
      <a href="#skills" className="transition-colors hover:text-sky-300">
        Skills
      </a>
      <a href="#projects" className="transition-colors hover:text-sky-300">
        Labs & Projects
      </a>
      <a href="#contact" className="transition-colors hover:text-sky-300">
        Contact
      </a>
    </nav>

    <a
      href="#contact"
      className="rounded-lg border border-sky-400/30 bg-sky-400/[0.08] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-sky-300 transition-all hover:border-sky-300/70 hover:bg-sky-400/15"
    >
      Let's Connect <span aria-hidden="true">↗</span>
    </a>
  </header>

  {/* Hero content */}
  <div
    ref={contentRef}
    className="relative z-20 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-14 px-6 pb-12 pt-10 md:px-12 lg:grid-cols-12 lg:gap-8"
  >
    {/* Introduction */}
    <div className="flex flex-col items-start text-left lg:col-span-7">
      <div className="hero-anim-item mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>

        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
          Cybersecurity Enthusiast / BCA Graduate
        </span>
      </div>

      <p className="hero-anim-item mb-4 font-mono text-xs uppercase tracking-[0.24em] text-sky-400">
        // Securing the digital world
      </p>

      <h1 className="hero-anim-item text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl">
        THINK LIKE
        <br />
        AN ATTACKER.
        <br />
        <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
          DEFEND LIKE
          <br />
          AN EXPERT.
        </span>
      </h1>

      <p className="hero-anim-item mt-7 max-w-xl text-sm leading-7 text-white/60 md:text-base">
        I'm building my cybersecurity skills through practical labs,
        network analysis, vulnerability testing, and security
        investigations. My goal is to grow into a skilled SOC analyst
        and help protect systems from evolving threats.
      </p>

      {/* Areas of interest */}
      <div className="hero-anim-item mt-6 flex flex-wrap gap-2">
        {securityRoles.map((role) => (
          <span
            key={role}
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[9px] tracking-wider text-white/65 sm:text-[10px]"
          >
            {role}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="hero-anim-item mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="group inline-flex items-center gap-3 rounded-lg bg-sky-400 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#041018] shadow-[0_0_30px_rgba(56,189,248,0.16)] transition-all hover:-translate-y-1 hover:bg-sky-300"
        >
          Explore My Labs
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-emerald-400/40 hover:text-emerald-300"
        >
          Contact Me
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Bottom metrics */}
      <div className="hero-anim-item mt-10 grid w-full max-w-xl grid-cols-3 border-t border-white/10 pt-6">
        <div className="pr-3">
          <p className="text-xl font-bold text-white md:text-2xl">SOC</p>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-white/40 md:text-[10px]">
            Career Goal
          </p>
        </div>

        <div className="border-l border-white/10 px-4">
          <p className="text-xl font-bold text-white md:text-2xl">Labs</p>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-white/40 md:text-[10px]">
            Hands-on Practice
          </p>
        </div>

        <div className="border-l border-white/10 pl-4">
          <p className="text-xl font-bold text-white md:text-2xl">Learn</p>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-white/40 md:text-[10px]">
            Every Day
          </p>
        </div>
      </div>
    </div>

    {/* Portrait / 3D card */}
    <div className="hero-anim-item flex justify-center lg:col-span-5 lg:justify-end">
      <div className="relative w-full max-w-[360px] [perspective:1200px] md:max-w-[410px]">
        {/* Neon glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-cyan-400/10 to-emerald-400/20 opacity-80 blur-3xl"
        />

        <div
          ref={cardRef}
          className="relative rounded-2xl border border-sky-400/25 bg-[#0a111b]/90 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.6)] [transform-style:preserve-3d] will-change-transform"
        >
          {/* Card top bar */}
          <div className="relative z-20 flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                Security Profile
              </span>
            </div>

            <span className="font-mono text-[9px] text-sky-300/70">
              PROFILE_001
            </span>
          </div>

          {/* Portrait */}
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#05080d] via-transparent to-sky-400/[0.08]"
            />

            <img
              src={pictureImg}
              alt="Portfolio profile portrait"
              className="h-[330px] w-full object-cover object-center sm:h-[390px]"
            />

            {/* Image scanline effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(56,189,248,0.12) 4px)',
              }}
            />

            <div className="absolute bottom-0 left-0 z-20 w-full p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sky-300">
                Digital Defender
              </p>

              <p className="mt-1 text-2xl font-black tracking-tight text-white">
                Vamshi<span className="text-sky-400">.</span>
              </p>

              <p className="mt-1 text-xs text-white/60">
                Aspiring SOC Analyst
              </p>
            </div>
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between gap-3 px-3 py-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                Focus Area
              </p>
              <p className="mt-1 text-xs font-semibold text-white/80">
                Blue Team Security
              </p>
            </div>

            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                Status: Learning
              </p>
            </div>
          </div>

          {/* Mouse glare */}
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
          />
        </div>

        {/* Floating decorative badge */}
        <div className="absolute -left-5 top-24 z-30 hidden rounded-xl border border-sky-400/20 bg-[#08111b]/95 p-3 shadow-xl backdrop-blur-xl sm:block md:-left-10">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 font-mono text-sm text-sky-300">
              &gt;_
            </span>
            <div>
              <p className="text-[10px] font-bold text-white">
                SECURITY LABS
              </p>
              <p className="mt-1 text-[9px] text-white/40">
                Learn · Analyze · Defend
              </p>
            </div>
          </div>
        </div>

        {/* Floating shield badge */}
        <div className="absolute -bottom-5 -right-3 z-30 rounded-xl border border-emerald-400/20 bg-[#08130f]/95 p-3 shadow-xl backdrop-blur-xl md:-right-7">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-emerald-400">⌘</span>
            <div>
              <p className="text-[10px] font-bold text-white">
                DEFENSE MODE
              </p>
              <p className="mt-1 font-mono text-[9px] text-emerald-300/70">
                DETECT / INVESTIGATE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom ticker */}
  <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-t border-white/[0.08] px-6 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35 md:px-12 md:text-[10px]">
    <span className="hidden sm:inline">
      Cybersecurity / Continuous Learning
    </span>

    <span className="text-sky-300/70">
      THINK · DETECT · DEFEND
    </span>

    <a
      href="#about"
      className="transition-colors hover:text-emerald-300"
    >
      Explore Portfolio ↓
    </a>
  </div>
</section>


);
}
