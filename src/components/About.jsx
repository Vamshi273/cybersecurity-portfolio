import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: "Vamshi",
  role: "Cybersecurity Analyst",
  location: "India",
  status: "OPEN TO OPPORTUNITIES",

  introduction:
    "I'm building my expertise in cybersecurity, security monitoring, and threat investigation. I enjoy understanding how attacks work, analyzing security events, and learning how to defend systems.",

  focus:
    "My goal is to become a skilled cybersecurity professional who can investigate suspicious activity, identify vulnerabilities, and help organizations strengthen their security.",

  skills: [
    "SOC Analysis",
    "SIEM",
    "Python",
    "Linux",
    "Networking",
    "Web Security",
    "Wireshark",
    "Nmap",
  ],

  achievements: [
    {
      number: "01",
      title: "Security Labs",
      description:
        "Hands-on cybersecurity exercises, security investigations, and technical documentation.",
      tag: "PRACTICAL LEARNING",
    },
    {
      number: "02",
      title: "Threat Investigation",
      description:
        "Learning to analyze logs, investigate suspicious activity, and understand attack techniques.",
      tag: "BLUE TEAM",
    },
    {
      number: "03",
      title: "Security Automation",
      description:
        "Exploring Python scripts and tools to make security analysis more efficient.",
      tag: "PYTHON",
    },
  ],

  technologies: [
    "Python",
    "Linux",
    "Kali Linux",
    "Wireshark",
    "Nmap",
    "Git",
    "MySQL",
    "Networking",
    "SIEM",
    "Web Security",
  ],
};

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const numberRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards = cardRefs.current.filter(Boolean);
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleMouseMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      if (mediaQuery.matches) return;

      const rotateX = ((y / rect.height) - 0.5) * -4;
      const rotateY = ((x / rect.width) - 0.5) * 4;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (event) => {
      gsap.to(event.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const context = gsap.context(() => {
      if (!mediaQuery.matches) {
        gsap.fromTo(
          ".about-heading",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 55,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              once: true,
            },
          }
        );

        if (numberRef.current) {
          gsap.fromTo(
            numberRef.current,
            { textContent: 0 },
            {
              textContent: 3,
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: numberRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }
    }, section);

    if (!mediaQuery.matches) {
      cards.forEach((card) => {
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });

      gsap.killTweensOf(cards);
      context.revert();
    };
  }, []);

  const setCardRef = (element, index) => {
    cardRefs.current[index] = element;
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#05070a] px-5 py-28 text-white sm:px-8 md:px-12 md:py-36"
    >
      {/* Background atmosphere */}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-600/[0.10] blur-[140px]" />

        <div className="absolute bottom-[-10%] right-[-5%] h-[450px] w-[450px] rounded-full bg-emerald-500/[0.08] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <header className="about-heading mb-14 space-y-6 md:mb-20">

          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-emerald-300 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            {profile.status}
          </div>

          <div className="space-y-4">

            <p className="font-mono text-xs uppercase tracking-[0.35em] text-blue-400">
              {"// 01 — WHO I AM"}
            </p>

            <h2 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Curious mind.
              <br />

              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Security-driven.
              </span>
            </h2>

            <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Getting beneath the surface of technology to understand
              threats, investigate suspicious activity, and build a
              stronger security mindset.
            </p>

          </div>
        </header>

        {/* Main Bento Grid */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">

          {/* Identity Card */}

          <article
            ref={(element) => setCardRef(element, 0)}
            className="about-card group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1018]/90 p-7 shadow-2xl transition-colors duration-300 hover:border-blue-400/40 sm:p-9 md:col-span-7 md:p-11"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.12), transparent 75%)",
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-10">

              <div className="space-y-7">

                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-blue-400">
                    IDENTITY_MODULE
                  </span>

                  <span className="rounded-lg border border-white/10 px-3 py-1 font-mono text-[10px] text-slate-500">
                    001
                  </span>
                </div>

                <div>
                  <p className="mb-3 text-sm text-slate-500">
                    Hello, I'm
                  </p>

                  <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {profile.name}
                  </h3>

                  <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {profile.role}
                    <span className="text-slate-700">/</span>
                    {profile.location}
                  </p>
                </div>

                <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                  {profile.introduction}
                </p>

                <p className="max-w-xl text-sm leading-7 text-slate-500">
                  {profile.focus}
                </p>

              </div>

              <div className="flex flex-wrap gap-2">
                {["CYBERSECURITY", "BLUE TEAM", "CONTINUOUS LEARNING"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 font-mono text-[9px] tracking-wider text-slate-400 sm:text-[10px]"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

            </div>
          </article>

          {/* Security Focus Card */}

          <article
            ref={(element) => setCardRef(element, 1)}
            className="about-card group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1018]/90 p-7 transition-colors duration-300 hover:border-emerald-400/40 sm:p-9 md:col-span-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.10), transparent 75%)",
              }}
            />

            <div className="relative z-10 flex h-full flex-col">

              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-emerald-400">
                  SECURITY_FOCUS
                </span>

                <span className="font-mono text-xs text-slate-600">
                  002
                </span>
              </div>

              <div className="mb-8 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400 transition-transform duration-500 group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m9 12 2 2 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    Defensive Security
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    DETECT · ANALYZE · RESPOND
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                {[
                  ["01", "Security Monitoring"],
                  ["02", "Log Analysis"],
                  ["03", "Threat Investigation"],
                  ["04", "Vulnerability Assessment"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:border-emerald-400/20"
                  >
                    <span className="font-mono text-[10px] text-emerald-500/70">
                      {number}
                    </span>

                    <span className="text-sm text-slate-300">
                      {title}
                    </span>

                    <span className="ml-auto text-xs text-slate-600">
                      ↗
                    </span>
                  </div>
                ))}

              </div>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                Focused on developing practical skills through hands-on
                labs and security investigations.
              </p>

            </div>
          </article>

          {/* Experience / Learning Cards */}

          {profile.achievements.map((item, index) => (
            <article
              key={item.number}
              ref={(element) => setCardRef(element, index + 2)}
              className="about-card group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1018]/90 p-6 transition-colors duration-300 hover:border-blue-400/40 sm:p-8 md:col-span-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.10), transparent 75%)",
                }}
              />

              <div className="relative z-10">

                <div className="mb-10 flex items-start justify-between">

                  <span className="font-mono text-4xl font-bold text-white/[0.07] transition-colors duration-300 group-hover:text-blue-400/20">
                    {item.number}
                  </span>

                  <span className="rounded-md border border-blue-400/15 bg-blue-400/[0.05] px-2.5 py-1.5 font-mono text-[9px] tracking-wider text-blue-300">
                    {item.tag}
                  </span>

                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-8 h-px w-full bg-white/[0.06]">
                  <div className="h-px w-0 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-700 group-hover:w-full" />
                </div>

              </div>
            </article>
          ))}

          {/* Technology Stack */}

          <article
            ref={(element) => setCardRef(element, 5)}
            className="about-card group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1018]/90 p-7 transition-colors duration-300 hover:border-emerald-400/30 sm:p-9 md:col-span-12 md:p-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.07), transparent 75%)",
              }}
            />

            <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-center">

              <div className="space-y-4 md:col-span-4">

                <p className="font-mono text-xs tracking-[0.2em] text-emerald-400">
                  {"// TECHNICAL_TOOLKIT"}
                </p>

                <h3 className="text-2xl font-bold sm:text-3xl">
                  Tools of the trade.
                </h3>

                <p className="max-w-sm text-sm leading-7 text-slate-400">
                  Technologies and tools I'm learning and using to build
                  practical cybersecurity skills.
                </p>

              </div>

              <div className="md:col-span-8">

                <div className="flex flex-wrap gap-3">

                  {profile.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 font-mono text-xs text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:text-emerald-300"
                    >
                      {technology}
                    </span>
                  ))}

                </div>

              </div>

            </div>
          </article>

        </div>

        {/* Footer status */}

        <footer className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 font-mono text-[10px] tracking-wider text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-xs">

          <p>
            ABOUT_MODULE <span className="text-emerald-400">●</span> LOADED
          </p>

          <p>
            STATUS: LEARNING · BUILDING · INVESTIGATING
          </p>

        </footer>

      </div>
    </section>
  );
};

export default About;