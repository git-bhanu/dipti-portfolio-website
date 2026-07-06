import Link from 'next/link';

type NavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brand: string;
  locationTag?: string;
  links: NavLink[];
};

export default function Header({ links }: HeaderProps) {
  const navLinks = links.filter((l) => l.label.toLowerCase() !== 'home');

  return (
    <header className="flex h-[80px] w-full items-center justify-between overflow-x-hidden px-5 md:px-[8vw]">
      <Link href="/" aria-label="Home">
        <img
          src="/logo.svg"
          alt="Serifs & Systems"
          width={200}
          height={31}
          className="hidden md:block"
        />
        <img
          src="/logo-mobile.svg"
          alt="Serifs & Systems"
          width={82}
          height={47}
          className="block md:hidden"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="p-2 text-nav font-normal uppercase text-brand-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      <nav className="flex items-center gap-4 md:hidden" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="text-nav font-normal uppercase text-brand-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
