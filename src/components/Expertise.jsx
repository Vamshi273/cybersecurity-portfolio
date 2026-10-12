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
const cardsRef = useRef([]);

useLayoutEffect(() => {
const section = sectionRef.current;


if (!section) return undefined;

const context = gsap.context(() => {
  const cards = cardsRef.current.filter(Boolean);

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: undefined,
    }
  );
}, section);

return () => context.revert();


}, []);

return ( <section
   id="skills"
   ref={sectionRef}
   className="relative overflow-hidden bg-[#050810] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
 >
{/* Background grid */}
<div
aria-hidden="true"
className="pointer-events-none absolute inset-0 opacity-40"
style={{
backgroundImage:
'linear-gradient(rgba(56,189,248,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.045) 1px, transparent 1px)',
backgroundSize: '48px 48px',
}}
/>


  <div className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />

  <div className="pointer-events-none absolute bottom-0 right-[-100px] h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />

  <div className="relative z-10 mx-auto max-w-7xl">
    {/* Heading */}
    <div className="mb-12 max-w-3xl md:mb-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-sky-400" />

        <span className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300">
          Technical Arsenal
        </span>
      </div>

      <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Skills &amp;{' '}
        <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
          Expertise
        </span>
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
        Building cybersecurity knowledge through practical labs,
        security tools, network analysis, and continuous learning.
      </p>
    </div>

    {/* Responsive skill cards */}
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
