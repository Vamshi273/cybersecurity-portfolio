import React from "react";

const Footer = () => {
const currentYear = new Date().getFullYear();

const navigation = [
{ label: "Home", href: "#home" },
{ label: "About", href: "#about" },
{ label: "Expertise", href: "#expertise" },
{ label: "Skills", href: "#skills" },
{ label: "Projects", href: "#projects" },
{ label: "Contact", href: "#contact" },
];

const socials = [
{
label: "GitHub",
href: "https://github.com/vamshi273",
icon: ( <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.65 10.65 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" /> </svg>
),
},
{
label: "LinkedIn",
href: "https://www.linkedin.com/in/vamshi-a-n-580402373/",
icon: ( <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.45H4.98V9h2.95v9.45ZM6.45 7.71a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12 10.74H15.5v-4.6c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.76 1.2-1.76 2.43v4.68H9.26V9h2.83v1.29h.04a3.1 3.1 0 0 1 2.79-1.53c2.98 0 3.53 1.96 3.53 4.51v5.18Z" /> </svg>
),
},
];

return ( <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#05070a] px-5 py-14 text-white sm:px-8 md:px-12 md:py-20">
{/* Ambient background */} <div className="pointer-events-none absolute inset-0 -z-10"> <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[120px]" /> <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-[120px]" />
<div
className="absolute inset-0 opacity-[0.07]"
style={{
backgroundImage:
"linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
backgroundSize: "48px 48px",
}}
/> </div>


  <div className="mx-auto max-w-7xl">
    {/* Main footer content */}
    <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
      {/* Brand */}
      <div className="space-y-6 md:col-span-5">
        <a
          href="#home"
          aria-label="Return to homepage"
          className="group inline-flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-400/[0.07] transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-blue-400/[0.12]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-6 w-6 text-blue-400"
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
            <span className="block text-xl font-black tracking-tight">
              Vamshi<span className="text-blue-400"> A N</span>
              <span className="text-emerald-400">.</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-slate-500">
              SECURITY PORTFOLIO
            </span>
          </div>
        </a>

        <p className="max-w-sm text-sm leading-7 text-slate-400">
          Exploring cybersecurity, investigating threats, and building
          practical skills to create a safer digital world.
        </p>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] tracking-wider text-emerald-300">
            OPEN TO OPPORTUNITIES
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="md:col-span-3">
        <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-slate-500">
          {"// NAVIGATION"}
        </h3>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-5 gap-y-4"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-300 hover:text-blue-300"
            >
              <span className="h-1 w-1 rounded-full bg-slate-700 transition-colors group-hover:bg-blue-400" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Social connections */}
      <div className="md:col-span-4">
        <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-slate-500">
          {"// CONNECT"}
        </h3>

        <p className="mb-6 text-sm leading-7 text-slate-400">
          Interested in cybersecurity, security research, or collaborating
          on technical projects? Let's connect.
        </p>

        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.label}`}
              className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/[0.06] hover:text-blue-300"
            >
              <span className="h-4 w-4 transition-transform duration-300 group-hover:scale-110">
                {social.icon}
              </span>
              {social.label}
              <span className="text-xs text-slate-600 transition-colors group-hover:text-blue-400">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-6 text-slate-500">
        © {currentYear} Vamshi. All rights reserved.
      </p>

      <a
        href="#home"
        className="group inline-flex items-center gap-2 self-start font-mono text-[10px] tracking-widest text-slate-500 transition-colors hover:text-blue-300 sm:self-auto"
      >
        BACK TO TOP
        <span className="transition-transform duration-300 group-hover:-translate-y-1">
          ↑
        </span>
      </a>

      <p className="font-mono text-[10px] tracking-wider text-slate-600">
        DESIGNED WITH PRECISION.
      </p>
    </div>
  </div>
</footer>


);
};

export default Footer;
