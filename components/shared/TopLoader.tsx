'use client';

import { animate } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function TopLoader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  // Start on link click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      if (href === pathname) return;

      const bar = barRef.current;
      if (!bar) return;
      animationRef.current?.stop();
      bar.style.opacity = '1';
      animationRef.current = animate(bar, { scaleX: [0, 0.75] }, { duration: 2, ease: 'easeOut' });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Complete on route change
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const bar = barRef.current;
    if (!bar) return;
    animationRef.current?.stop();
    animationRef.current = animate(
      bar,
      { scaleX: 1 },
      { duration: 0.2, ease: 'easeOut', onComplete: () => {
        animate(bar, { opacity: 0 }, { duration: 0.3, delay: 0.1 });
      }}
    );
  }, [pathname]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-brand-white origin-left"
      style={{ opacity: 0, scaleX: 0, transformOrigin: 'left' }}
    />
  );
}
