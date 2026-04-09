"use client";

import { useEffect, useState } from 'react';

type NavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brand: string;
  locationTag: string;
  links: NavLink[];
};

export default function Header({ brand, locationTag, links }: HeaderProps) {
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Mexico_City',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const updateTime = () => setTimeLabel(formatter.format(new Date()));
    updateTime();

    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="grid grid-cols-1 items-start gap-3 px-3 pb-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:pt-1.5">
      <a href="#top" className="justify-self-start text-[0.88rem] font-medium uppercase tracking-[0.01em]">
        {brand}
      </a>
      <nav
        className="flex items-center gap-2 text-[0.88rem] uppercase tracking-[0.01em] md:justify-self-center md:gap-8"
        aria-label="Primary navigation"
      >
        {links.map((link) => (
          <a key={`${link.label}-${link.href}`} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex gap-1 text-[0.88rem] uppercase tracking-[0.01em] md:justify-self-end">
        <span>{locationTag}</span>
        <span>{timeLabel}</span>
      </div>
    </header>
  );
}
