import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    number: "01",
    type: "UNDERGRADUATE",
    title: "Bachelor of Computer Applications",
    institution: "SDC Degree College",
    location: "Kolar, Karnataka",
    year: "2023-26(Completed)",
    score: "9.1",
    scoreLabel: "CGPA / 10",
    icon: "⌘",
  },
  {
    number: "02",
    type: "PRE-UNIVERSITY",
    title: "Pre-University Course",
    institution: "Sai Vijaya PU College",
    location: "Kolar, Karnataka",
    year: "2021-23(Completed)",
    score: "91.5%",
    scoreLabel: "549 / 600 MARKS",
    icon: "◈",
  },
];

const certifications = [
  {
    number: "01",
    code: "SOC",
    title: "Security Operations Center",
    description:
      "Training in security monitoring, threat detection, and SOC operations.",
    tag: "SOC TRAINING",
  },
  {
    number: "02",
    code: "CEH",
    title: "Certified Ethical Hacker",
    description: "Ethical hacking and cybersecurity course.",
    tag: "CEH COURSE",
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const animateOnScroll = (selector, options = {}) => {
        const elements = section.querySelectorAll(selector);

        if (!elements.length) return;

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: elements[0],
              start: "top 90%",
              once: true,
            },
            ...options,
          }
        );
      };

      animateOnScroll(".education-heading");
      animateOnScroll(".education-card");
      animateOnScroll(".certification-card");

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05070c] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Main heading */}
        <div className="education-heading mb-14">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.22em] text-cyan-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span>PERSONAL DEVELOPMENT</span>
            <span className="text-white/20">/</span>
            <span className="text-white/45">EDU_MODULE_01</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-white/40">
                Academic Background
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Education
                <span className="text-cyan-400"> &</span>
                <br className="sm:hidden" /> Certifications
                <span className="text-cyan-400">.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                My academic journey and cybersecurity training, building a
                foundation for a career in security operations and ethical
                hacking.
              </p>
            </div>

            <div className="hidden border-l border-cyan-400/30 pl-5 font-mono text-xs leading-7 text-white/40 sm:block">
              <p>PROFILE: CYBERSECURITY</p>
              <p>STATUS: LEARNING & GROWING</p>
              <p className="text-cyan-400">ACCESS: VERIFIED</p>
            </div>
          </div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-400/70 via-cyan-400/15 to-transparent" />
        </div>

        {/* Education cards */}
        <div className="education-grid grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.number}
              className="education-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/[0.035] sm:p-8"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full border-b border-l border-cyan-400/10 transition group-hover:border-cyan-400/30" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] text-2xl text-cyan-400">
                  {item.icon}
                </div>

                <span className="font-mono text-xs tracking-widest text-white/30">
                  EDU_{item.number}
                </span>
              </div>

              <p className="mt-7 font-mono text-[10px] tracking-[0.25em] text-cyan-400">
                {item.type}
              </p>

              <h3 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-white/65">
                {item.institution}
              </p>

              <p className="mt-1 text-xs text-white/35">
                {item.location}
              </p>

              <div className="mt-7 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-white/40">
                    ACADEMIC SCORE
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl">
                    {item.score}
                  </p>

                  <p className="mt-1 font-mono text-[10px] tracking-wider text-white/40">
                    {item.scoreLabel}
                  </p>
                </div>

                <span className="rounded-md border border-white/10 px-3 py-2 font-mono text-[10px] text-white/50">
                  {item.year}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Certifications heading */}
        <div className="education-heading mb-7 mt-20">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.22em] text-cyan-400">
            <span className="text-lg">＋</span>
            <span>PROFESSIONAL DEVELOPMENT</span>
            <span className="text-white/20">/</span>
            <span className="text-white/40">TRAINING_MODULE_02</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
            Cybersecurity <span className="text-cyan-400">Training</span>
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Specialized learning in security operations and ethical hacking.
          </p>
        </div>

        {/* Certification cards */}
        <div className="certification-grid grid gap-5 md:grid-cols-2">
          {certifications.map((cert) => (
            <article
              key={cert.number}
              className="certification-card group rounded-2xl border border-white/10 bg-[#0a0e16] p-6 transition duration-300 hover:border-cyan-400/40 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-mono text-3xl font-bold tracking-wider text-cyan-400/80 transition group-hover:text-cyan-300">
                  {cert.code}
                </div>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 font-mono text-[9px] tracking-widest text-cyan-400">
                  {cert.tag}
                </span>
              </div>

              <h4 className="mt-6 text-lg font-semibold">{cert.title}</h4>

              <p className="mt-3 text-sm leading-6 text-white/50">
                {cert.description}
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[10px] tracking-wider text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                TRAINING & SKILL DEVELOPMENT
              </div>
            </article>
          ))}
        </div>

        {/* Footer label */}
        <div className="education-heading mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[10px] tracking-[0.15em] text-white/30">
          <span>EDUCATION_DATABASE // END_OF_RECORD</span>
          <span>CONTINUOUS LEARNING // 2026</span>
        </div>
      </div>
    </section>
  );
}

