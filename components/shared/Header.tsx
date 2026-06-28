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
    <header className="flex h-[80px] items-center justify-between px-5 md:px-10">
      <a href="#top" aria-label="Home">
        {/* Desktop logo: 200px wide (original dimensions) */}
        <img
          src="/logo.svg"
          alt="Serifs & Systems"
          width={200}
          height={31}
          className="hidden md:block"
        />
        {/* Mobile logo: 2-row layout 82×47px */}
        <img
          src="/logo-mobile.svg"
          alt="Serifs & Systems"
          width={82}
          height={47}
          className="block md:hidden"
        />
      </a>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="p-2 text-nav font-normal uppercase text-brand-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile nav */}
      <nav className="flex items-center gap-4 md:hidden" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="text-nav font-normal uppercase text-brand-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
