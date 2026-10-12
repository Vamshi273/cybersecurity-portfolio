import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Network Reconnaissance',
    category: 'NETWORK SECURITY',
    description:
      'A practical lab exploring network discovery, host identification, open ports, and service enumeration using Nmap.',
    tags: ['Nmap', 'Kali Linux', 'Networking'],
    status: 'LAB PROJECT',
    code: 'LAB_001',
  },
  {
    title: 'SOC Log Analysis',
    category: 'SECURITY OPERATIONS',
    description:
      'Practice examining security events, identifying suspicious activity, and documenting findings through a SOC analyst workflow.',
    tags: ['SIEM', 'Windows Logs', 'SOC'],
    status: 'PRACTICE LAB',
    code: 'LAB_002',
  },
  {
    title: 'Web Traffic Investigation',
    category: 'NETWORK FORENSICS',
    description:
      'Inspect HTTP traffic and packet captures to understand communication patterns, investigate requests, and identify potentially suspicious behavior.',
    tags: ['Wireshark', 'HTTP', 'PCAP'],
    status: 'PRACTICE LAB',
    code: 'LAB_003',
  },
  {
    title: 'Phishing Investigation',
    category: 'THREAT ANALYSIS',
    description:
      'Practice examining suspicious messages, reviewing indicators of compromise, and recording investigation findings.',
    tags: ['Phishing', 'VirusTotal', 'IOC'],
    status: 'PRACTICE LAB',
    code: 'LAB_004',
  },
  {
    title: 'Python Nmap Automation',
    category: 'SECURITY AUTOMATION',
    description:
      'Explore automating network scanning workflows with Python and Nmap in an authorized lab environment.',
    tags: ['Python', 'Nmap', 'Automation'],
    status: 'DEVELOPMENT',
    code: 'LAB_005',
  },
  {
    title: 'Web Application Security',
    category: 'APPLICATION SECURITY',
    description:
      'Explore common web application vulnerabilities in a controlled practice environment and document findings and remediation ideas.',
    tags: ['OWASP', 'Web Security', 'Testing'],
    status: 'PRACTICE LAB',
    code: 'LAB_006',
  },
  {
    title: 'Incident Report Documentation',
    category: 'INCIDENT RESPONSE',
    description:
      'Structure security findings into incident reports covering severity, affected assets, evidence, potential impact, and recommended remediation.',
    tags: ['Incident Response', 'CVSS', 'Reporting'],
    status: 'DOCUMENTATION',
    code: 'LAB_007',
  },
  {
    title: 'AVI Security Portfolio',
    category: 'SECURITY & DEVELOPMENT',
    description:
      'An interactive portfolio showcasing cybersecurity learning, technical skills, practical labs, and security-focused development work.',
    tags: ['React', 'JavaScript', 'Tailwind CSS'],
    status: 'IN DEVELOPMENT',
    code: 'DEV_008',
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return undefined;

    const ctx = gsap.context(() => {
      const folderBack = folderBackRef.current;
      const folderFront = folderFrontRef.current;

      gsap.set([folderBack, folderFront], {
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(folderFront, {
        transformOrigin: 'bottom center',
        backfaceVisibility: 'hidden',
      });

      const getGridPosition = (index) => {
        if (index < 3) {
          return { row: 0, col: index };
        }

        if (index === 3) {
          return { row: 1, col: 0 };
        }

        if (index === 4) {
          return { row: 1, col: 2 };
        }

        return { row: 2, col: index - 5 };
      };

      const desktopCards = cardsRef.current.filter(Boolean);

      gsap.set(desktopCards, {
        xPercent: -50,
        yPercent: -50,
        rotation: (index) =>
          gsap.utils.random(-4, 4) + (index % 2 ? 0.5 : -0.5),
        scale: 0.85,
        x: 0,
        y: 0,
        opacity: 1,
      });

      const media = gsap.matchMedia();

      // DESKTOP: animated archive folder and floating cards
      media.add('(min-width: 768px)', () => {
        let floatingTween;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 65%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',

            onLeave: () => {
              floatingTween?.pause();
            },

            onEnterBack: () => {
              floatingTween?.resume();
            },

            onLeaveBack: () => {
              floatingTween?.pause();
            },
          },

          onComplete: () => {
            floatingTween = gsap.to(desktopCards, {
              y: '+=8',
              rotation: '+=0.5',
              duration: 3,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              stagger: {
                amount: 1,
                from: 'random',
              },
            });
          },
        });

        timeline.to(folderFront, {
          rotationX: -130,
          duration: 1,
          ease: 'power3.inOut',
        });

        timeline.to(
          desktopCards,
          {
            y: -100,
            scale: 0.9,
            duration: 0.65,
            stagger: 0.04,
            ease: 'back.out(1.2)',
          },
          '-=0.45'
        );

        timeline.to(
          desktopCards,
          {
            x: (index) => {
              const cardWidth =
                desktopCards[0]?.offsetWidth || 360;

              const { col } = getGridPosition(index);

              return (col - 1) * (cardWidth + 28);
            },

            y: (index) => {
              const cardHeight =
                desktopCards[0]?.offsetHeight || 240;

              const { row } = getGridPosition(index);

              return (row - 1) * (cardHeight + 28);
            },

            rotation: () => gsap.utils.random(-2, 2),
            scale: 1,
            duration: 1.25,

            stagger: {
              amount: 0.35,
              from: 'center',
            },

            ease: 'expo.out',
          },
          '-=0.15'
        );

        return () => {
          floatingTween?.kill();
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      // MOBILE: show only the horizontal project carousel
      media.add('(max-width: 767px)', () => {
        const carousel = mobileCarouselRef.current;
        const mobileCards =
          mobileCardsRef.current.filter(Boolean);

        if (!carousel || mobileCards.length === 0) {
          return undefined;
        }

        gsap.set(mobileCards, {
          x: 0,
          y: 24,
          scale: 0.94,
          opacity: 0,
          rotation: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: carousel,
            start: 'top 85%',
            once: true,
          },
        });

        timeline.to(mobileCards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          gsap.set(mobileCards, {
            clearProps: 'all',
          });
        };
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050810] px-4 py-24 font-sans text-white md:min-h-[160vh] md:overflow-x-clip md:py-32"
    >
      {/* Background typography */}
      <div className="pointer-events-none absolute left-0 top-10 z-0 flex w-full justify-center overflow-hidden">
        <h2 className="whitespace-nowrap text-[17vw] font-black uppercase leading-none tracking-tighter text-white/[0.025] md:text-[19vw]">
          PROJECTS
        </h2>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.09] blur-[120px]" />

      <div className="pointer-events-none absolute left-[15%] top-[25%] z-0 h-48 w-48 rounded-full bg-emerald-400/[0.05] blur-[100px]" />

      {/* Archive label */}
      <div className="absolute left-5 top-8 z-10 font-mono text-[10px] tracking-[0.25em] text-blue-300/50 md:left-12 md:top-12">
        ARCHIVE / 08 RECORDS
      </div>

      {/* Database label */}
      <div className="absolute bottom-8 right-5 z-10 font-mono text-[10px] tracking-widest text-white/30 md:bottom-12 md:right-12">
        SECURITY PROJECT DATABASE
      </div>

      {/* ================================================== */}
      {/* DESKTOP ARCHIVE */}
      {/* IMPORTANT: hidden on mobile to prevent the extra box */}
      {/* ================================================== */}

      <div className="relative z-10 hidden h-[900px] w-full max-w-7xl items-center justify-center perspective-[2000px] md:mx-auto md:mt-0 md:flex">
        <div className="relative h-0 w-0 transform-style-3d">
          {/* Folder back */}
          <div
            ref={folderBackRef}
            className="absolute flex aspect-video w-[360px] items-center justify-center rounded-3xl border border-blue-400/30 bg-[#0b1423] shadow-[0_20px_70px_rgba(37,99,235,0.15)]"
            style={{ zIndex: 5 }}
          >
            {/* Folder tab */}
            <div className="absolute -top-5 left-6 h-7 w-28 rounded-t-xl border border-b-0 border-blue-400/25 bg-[#101d30]" />

            <div className="flex flex-col items-center gap-3 font-mono">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-400/10 text-blue-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8"
                  aria-hidden="true"
                >
                  <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <span className="text-sm font-bold tracking-[0.25em] text-blue-200/80">
                SECURE_ARCHIVE
              </span>

              <span className="text-[9px] tracking-[0.2em] text-emerald-300/60">
                ACCESS GRANTED
              </span>
            </div>
          </div>

          {/* Eight desktop project cards */}
          {projectsData.map((project, index) => (
            <article
              key={project.code}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="group absolute hidden aspect-[16/10] w-[320px] max-w-[380px] will-change-transform md:block lg:w-[360px]"
              style={{ zIndex: 10 + index }}
            >
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]/[0.97] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-blue-400/60">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/0 blur-3xl transition-colors duration-500 group-hover:bg-blue-500/15" />

                {/* Card status */}
                <div className="relative flex items-center justify-between gap-3">
                  <span className="rounded border border-blue-400/20 bg-blue-400/[0.08] px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-blue-300">
                    {project.code}
                  </span>

                  <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-emerald-300/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                    {project.status}
                  </span>
                </div>

                {/* Card information */}
                <div className="relative my-auto space-y-3 py-4">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-white/40">
                    {project.category}
                  </p>

                  <h3 className="text-xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-blue-300 lg:text-2xl">
                    {project.title}
                  </h3>

                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-300/70">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-slate-300/80 transition-colors group-hover:border-blue-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Corner indicator */}
                <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
              </div>
            </article>
          ))}

          {/* Folder front */}
          <div
            ref={folderFrontRef}
            className="pointer-events-none absolute aspect-video w-[360px] will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 flex h-[85%] w-full flex-col justify-end rounded-b-3xl rounded-t-md border-t border-blue-400/30 bg-[#101a2b] p-6 shadow-[0_-5px_25px_rgba(0,0,0,0.65)]">
              <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-blue-300/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* MOBILE CAROUSEL */}
      {/* No folder behind the cards */}
      {/* ================================================== */}

      <div
        ref={mobileCarouselRef}
        className="hide-scrollbar relative z-20 mt-16 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] py-8 md:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {projectsData.map((project, index) => (
          <article
            key={`${project.code}-mobile`}
            ref={(element) => {
              mobileCardsRef.current[index] = element;
            }}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center will-change-transform"
          >
            <div className="group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-blue-400/50">
              {/* Subtle mobile card glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              {/* Status */}
              <div className="relative flex items-center justify-between gap-2">
                <span className="rounded border border-blue-400/20 bg-blue-400/[0.08] px-2 py-1 font-mono text-[10px] text-blue-300">
                  {project.code}
                </span>

                <span className="font-mono text-[9px] text-emerald-300/80">
                  {project.status}
                </span>
              </div>

              {/* Information */}
              <div className="relative space-y-3 py-6">
                <p className="font-mono text-[9px] tracking-widest text-white/40">
                  {project.category}
                </p>

                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                  {project.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-300/70">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-slate-300/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card indicator */}
              <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
            </div>
          </article>
        ))}
      </div>

      {/* Hide carousel scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;