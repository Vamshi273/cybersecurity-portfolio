import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MinimalPreloader({ onComplete }) {
const preloaderRef = useRef(null);
const contentRef = useRef(null);
const progressRef = useRef(null);
const statusRef = useRef(null);

useEffect(() => {
const preloader = preloaderRef.current;
const content = contentRef.current;
const progress = progressRef.current;
const status = statusRef.current;


if (!preloader || !content || !progress || !status) {
  if (onComplete) onComplete();
  return;
}

const messages = [
  'INITIALIZING SECURITY SYSTEMS...',
  'LOADING PORTFOLIO MODULES...',
  'ESTABLISHING SECURE CONNECTION...',
  'SYSTEM READY.',
];

let messageIndex = 0;

const context = gsap.context(() => {
  const timeline = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  timeline
    .set(preloader, { autoAlpha: 1 })
    .fromTo(
      content,
      {
        scale: 0.96,
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      }
    )
    .to(
      progress,
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )
    .to(
      {},
      {
        duration: 0.45,
        onUpdate: function () {
          const nextIndex = Math.min(
            messages.length - 1,
            Math.floor(this.progress() * messages.length)
          );

          if (nextIndex !== messageIndex) {
            messageIndex = nextIndex;
            status.textContent = messages[messageIndex];
          }
        },
      },
      '-=1.4'
    )
    .to(content, {
      scale: 1.02,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.35,
      ease: 'power2.in',
      delay: 0.15,
    })
    .to(preloader, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.inOut',
    });
}, preloader);

return () => {
  context.revert();
};


}, [onComplete]);

return ( <div
   ref={preloaderRef}
   aria-label="Loading portfolio"
   role="status"
   className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#05080d] text-white"
 >
{/* Background grid */}
<div
aria-hidden="true"
className="pointer-events-none absolute inset-0 opacity-20"
style={{
backgroundImage:
'linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)',
backgroundSize: '40px 40px',
}}
/>


  {/* Ambient glow */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-sky-500/[0.08] blur-[120px]"
  />

  <div
    ref={contentRef}
    className="relative flex w-full max-w-md flex-col items-center gap-7 px-6"
  >
    {/* Animated security indicator */}
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 animate-spin rounded-full border border-sky-400/20 border-t-sky-400" />

      <div className="absolute inset-2 rounded-full border border-emerald-400/20" />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/[0.08] shadow-[0_0_35px_rgba(56,189,248,0.12)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-7 w-7 text-sky-300"
          aria-hidden="true"
        >
          <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
    </div>

    {/* Brand */}
    <div className="text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-sky-400">
        Cybersecurity Portfolio
      </p>

      <h1 className="mt-3 text-3xl font-black tracking-[0.18em]">
        CYBER<span className="text-sky-400">SEC</span>
      </h1>

      <p className="mt-2 font-mono text-[10px] tracking-widest text-white/40">
        THINK · DETECT · DEFEND
      </p>
    </div>

    {/* Progress bar */}
    <div className="w-full max-w-xs">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span
          ref={statusRef}
          className="font-mono text-[9px] tracking-wider text-white/60"
        >
          INITIALIZING SECURITY SYSTEMS...
        </span>

        <span className="font-mono text-[10px] text-emerald-400">
          READY
        </span>
      </div>

      <div className="h-[2px] w-full overflow-hidden bg-white/10">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
        />
      </div>
    </div>

    {/* Footer */}
    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
      Initializing Digital Defense
    </p>
  </div>
</div>


);
}
