import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const skillCategories = [
  {
    number: '01',
    title: 'SOC & Security Monitoring',
    subtitle: 'DETECT • MONITOR • ANALYZE',
    description:
      'Learn to investigate security alerts, analyze logs, and understand security operations workflows.',
    skills: [
      'SOC Fundamentals',
      'SIEM Basics',
      'Security Log Analysis',
      'Windows Event Logs',
      'Alert Triage',
    ],
    icon: '◉',
    color: '#38bdf8',
  },
  {
    number: '02',
    title: 'Network Security',
    subtitle: 'DISCOVER • INSPECT • PROTECT',
    description:
      'Explore network traffic, understand communication protocols, and practice reconnaissance in authorized labs.',
    skills: [
      'TCP/IP',
      'DNS & HTTP',
      'Nmap',
      'Wireshark',
      'Network Reconnaissance',
    ],
    icon: '⌘',
    color: '#34d399',
  },
  {
    number: '03',
    title: 'Threat & Incident Analysis',
    subtitle: 'INVESTIGATE • ANALYZE • RESPOND',
    description:
      'Practice identifying suspicious indicators, investigating phishing, and documenting security incidents.',
    skills: [
      'IOC Analysis',
      'Phishing Analysis',
      'Incident Reports',
      'CVSS Basics',
      'MITRE ATT&CK Basics',
    ],
    icon: '⌁',
    color: '#a78bfa',
  },
  {
    number: '04',
    title: 'Web Application Security',
    subtitle: 'TEST • IDENTIFY • IMPROVE',
    description:
      'Study common web vulnerabilities and perform security testing in deliberately vulnerable lab environments.',
    skills: [
      'OWASP Top 10',
      'HTTP Requests',
      'SQL Injection Concepts',
      'Web Security Testing',
      'Vulnerability Analysis',
    ],
    icon: '⌘',
    color: '#fb923c',
  },
  {
    number: '05',
    title: 'Security Automation',
    subtitle: 'SCRIPT • AUTOMATE • SIMPLIFY',
    description:
      'Use programming and scripting fundamentals to automate tasks and support security investigations.',
    skills: [
      'Python',
      'MySQL',
      'Bash Basics',
      'REST API Basics',
      'Data Processing',
    ],
    icon: '</>',
    color: '#f472b6',
  },
  {
    number: '06',
    title: 'Tools & Environments',
    subtitle: 'BUILD • PRACTICE • LEARN',
    description:
      'Develop practical familiarity with security tools, virtual machines, and development environments.',
    skills: [
      'Kali Linux',
      'VirtualBox',
      'VirusTotal',
      'Git & GitHub',
      'Windows',
    ],
    icon: '⌬',
    color: '#facc15',
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const headingElements =
        headingRef.current?.querySelectorAll('[data-animate]');

      if (headingElements?.length) {
        gsap.fromTo(
          headingElements,
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }

      const cards = cardsRef.current.filter(Boolean);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          delay: 0.25,
        }
      );

      gsap.to('.hud-scan-line', {
        xPercent: 110,
        duration: 3,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.hud-pulse', {
        opacity: 0.35,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hud-dot', {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050810] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-100px] h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ============================= */}
        {/* CYBERSECURITY HUD HEADING */}
        {/* ============================= */}

        <div
          ref={headingRef}
          className="relative mb-14 md:mb-20"
        >
          {/* Top technical status bar */}
          <div
            data-animate
            className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-sky-400/15 py-3 font-mono text-[9px] tracking-[0.2em] text-slate-500 sm:text-[10px]"
          >
            <div className="flex items-center gap-3">
              <span className="hud-pulse h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

              <span>SECURITY OPERATIONS</span>

              <span className="text-slate-700">/</span>

              <span className="text-sky-300">CAPABILITIES</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-600">SYS.ID</span>
              <span className="text-sky-300">SK-2026</span>
              <span className="hidden text-slate-600 sm:inline">
                // MODULE 06
              </span>
            </div>
          </div>

          {/* Heading layout */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              {/* Section eyebrow */}
              <div
                data-animate
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-px w-10 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />

                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-300 sm:text-xs">
                  Technical Arsenal
                </span>

                <span className="hud-dot h-1.5 w-1.5 rounded-full bg-sky-400" />
              </div>

              {/* Main heading */}
              <h2
                data-animate
                className="max-w-4xl text-4xl font-black uppercase leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="block text-white">
                  Skills &amp;
                </span>

                <span className="relative mt-2 inline-block">
                  <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                    Expertise
                  </span>

                  {/* Animated underline */}
                  <span className="relative mt-3 block h-[3px] w-full overflow-hidden bg-sky-400/15">
                    <span className="hud-scan-line absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#38bdf8]" />
                  </span>
                </span>
              </h2>

              {/* Description */}
              <p
                data-animate
                className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
              >
                Building cybersecurity knowledge through practical labs,
                security tools, network analysis, and continuous learning.
              </p>

              {/* Technical metadata */}
              <div
                data-animate
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] tracking-wider text-slate-500 sm:text-xs"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sky-400">01.</span>
                  DETECT
                </span>

                <span className="text-slate-700">/</span>

                <span className="flex items-center gap-2">
                  <span className="text-sky-400">02.</span>
                  ANALYZE
                </span>

                <span className="text-slate-700">/</span>

                <span className="flex items-center gap-2">
                  <span className="text-sky-400">03.</span>
                  DEFEND
                </span>
              </div>
            </div>

            {/* Right-side HUD graphic */}
            <div
              data-animate
              aria-hidden="true"
              className="relative mx-auto hidden h-52 w-52 items-center justify-center lg:flex xl:h-60 xl:w-60"
            >
              {/* Outer frame */}
              <div className="absolute inset-0 rotate-45 border border-sky-400/20" />

              <div className="absolute inset-5 rotate-45 border border-emerald-400/20" />

              {/* Circular radar */}
              <div className="absolute inset-5 overflow-hidden rounded-full border border-sky-400/25">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Radar sweep */}
                <div
                  className="absolute inset-0 animate-spin rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.03) 240deg, rgba(56,189,248,0.4) 360deg)',
                    animationDuration: '8s',
                  }}
                />

                {/* Radar center */}
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/50 bg-sky-400/[0.04] shadow-[0_0_30px_rgba(56,189,248,0.12)]">
                  <div className="absolute inset-3 rounded-full border border-emerald-300/40" />

                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_15px_#38bdf8]" />
                </div>

                {/* Radar targets */}
                <span className="absolute left-[28%] top-[28%] h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]" />

                <span className="hud-dot absolute right-[24%] top-[36%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />

                <span className="hud-dot absolute bottom-[24%] left-[34%] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#a78bfa]" />
              </div>

              {/* Corner labels */}
              <span className="absolute -right-3 top-4 font-mono text-[9px] tracking-widest text-sky-300">
                SYS.ON
              </span>

              <span className="absolute -bottom-2 left-0 font-mono text-[9px] tracking-widest text-emerald-300">
                MONITORING
              </span>

              <span className="absolute -left-3 top-10 font-mono text-[9px] tracking-widest text-slate-500">
                0x01
              </span>
            </div>
          </div>

          {/* Bottom technical divider */}
          <div
            data-animate
            className="mt-10 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 bg-sky-400" />

            <span className="h-px flex-1 bg-gradient-to-r from-sky-400/40 via-sky-400/10 to-transparent" />

            <span className="font-mono text-[9px] tracking-[0.2em] text-slate-600 sm:text-[10px]">
              END OF HEADER // 001
            </span>
          </div>
        </div>

        {/* ============================= */}
        {/* ORIGINAL SKILL CARDS */}
        {/* ============================= */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <article
              key={category.number}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/90 p-6 transition duration-300 hover:-translate-y-2 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-950/30 sm:p-7"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Card glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: category.color }}
              />

              {/* Card header */}
              <div className="relative flex items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border text-xl font-bold"
                  style={{
                    color: category.color,
                    borderColor: `${category.color}55`,
                    backgroundColor: `${category.color}12`,
                  }}
                >
                  {category.icon}
                </div>

                <span className="font-mono text-xs tracking-widest text-slate-500">
                  {category.number} / 06
                </span>
              </div>

              {/* Card content */}
              <div className="relative mt-7">
                <p
                  className="mb-3 font-mono text-[10px] tracking-[0.16em] sm:text-xs"
                  style={{ color: category.color }}
                >
                  {category.subtitle}
                </p>

                <h3 className="text-xl font-semibold leading-snug sm:text-2xl">
                  {category.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>
              </div>

              {/* Skill tags */}
              <div className="relative mt-auto flex flex-wrap gap-2 pt-7">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300 transition-colors duration-200 group-hover:border-white/15"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Card footer */}
              <div className="relative mt-7 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            <span className="mr-2 text-emerald-400">●</span>
            Focused on hands-on practice and continuous learning.
          </p>

          <span className="font-mono text-xs tracking-wider text-slate-500">
            LEARN / PRACTICE / IMPROVE
          </span>
        </div>
      </div>
    </section>
  );
}
