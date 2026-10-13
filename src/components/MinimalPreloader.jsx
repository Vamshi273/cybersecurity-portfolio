import { useEffect, useMemo, useState } from 'react';

export default function MinimalPreloader({ onComplete }) {
  const messages = useMemo(
    () => [
      'INITIALIZING SECURITY SYSTEMS...',
      'LOADING PORTFOLIO MODULES...',
      'ESTABLISHING SECURE CONNECTION...',
      'SYSTEM READY.',
    ],
    []
  );

  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 4, 100);
        if (next >= 25) setStatusIndex(1);
        if (next >= 55) setStatusIndex(2);
        if (next >= 100) setStatusIndex(3);

        if (next >= 100) {
          clearInterval(timer);
          setVisible(false);
          window.setTimeout(() => {
            onComplete?.();
          }, 350);
        }

        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      aria-label="Loading portfolio"
      role="status"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#05080d] text-white transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-sky-500/[0.08] blur-[120px]"
      />

      <div className="relative flex w-full max-w-md flex-col items-center gap-7 px-6 transition-all duration-700 ease-out">
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

        <div className="w-full max-w-xs">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] tracking-wider text-white/60">
              {messages[statusIndex]}
            </span>

            <span className="font-mono text-[10px] text-emerald-400">
              {progress >= 100 ? 'READY' : 'LOADING'}
            </span>
          </div>

          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <div
              className="h-full origin-left bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-transform duration-150 ease-linear"
              style={{ transform: `scaleX(${progress / 100})`, width: '100%' }}
            />
          </div>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
          Initializing Digital Defense
        </p>
      </div>
    </div>
  );
}
