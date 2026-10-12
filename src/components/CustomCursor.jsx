import { useEffect, useRef } from 'react';

export default function CustomCursor() {
const dotRef = useRef(null);
const ringRef = useRef(null);
const spotlightRef = useRef(null);

useEffect(() => {
const dot = dotRef.current;
const ring = ringRef.current;
const spotlight = spotlightRef.current;

if (!dot || !ring || !spotlight) {
  return;
}

const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!finePointer || reducedMotion) {
  return;
}

let animationFrame = null;

function handleMouseMove(event) {
  const x = event.clientX;
  const y = event.clientY;

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
  }

  animationFrame = requestAnimationFrame(function () {
    dot.style.transform =
      'translate3d(' + (x - 6) + 'px, ' + (y - 6) + 'px, 0)';

    ring.style.transform =
      'translate3d(' + (x - 24) + 'px, ' + (y - 24) + 'px, 0)';

    spotlight.style.transform =
      'translate3d(' + (x - 350) + 'px, ' + (y - 350) + 'px, 0)';

    dot.style.opacity = '1';
    ring.style.opacity = '1';
    spotlight.style.opacity = '1';
  });
}

function handleMouseLeave() {
  dot.style.opacity = '0';
  ring.style.opacity = '0';
  spotlight.style.opacity = '0';
}

function handleMouseEnter() {
  dot.style.opacity = '1';
  ring.style.opacity = '1';
  spotlight.style.opacity = '1';
}

window.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseleave', handleMouseLeave);
document.addEventListener('mouseenter', handleMouseEnter);

console.log('Custom cursor initialized successfully');

return function () {
  window.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseleave', handleMouseLeave);
  document.removeEventListener('mouseenter', handleMouseEnter);

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
  }
};


}, []);

return (
<>
{/* Blue-green spotlight */}
<div
ref={spotlightRef}
aria-hidden="true"
className="pointer-events-none fixed left-0 top-0 z-[9997] h-[700px] w-[700px] rounded-full opacity-0 blur-[100px] transition-opacity duration-300"
style={{
background:
'radial-gradient(circle, rgba(56,189,248,0.13), rgba(16,185,129,0.06) 40%, transparent 72%)',
}}
/>


  {/* Electric-blue cursor dot */}
  <div
    ref={dotRef}
    aria-hidden="true"
    className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-sky-400 opacity-0 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
    style={{
      transition: 'opacity 150ms ease',
    }}
  />

  {/* Cursor follower ring */}
  <div
    ref={ringRef}
    aria-hidden="true"
    className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/70 bg-sky-400/[0.03] opacity-0 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
    style={{
      transition: 'opacity 150ms ease, transform 120ms ease-out',
    }}
  >
    <div className="h-1 w-1 rounded-full bg-emerald-400" />
  </div>
</>


);
}
